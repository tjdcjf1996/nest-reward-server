import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Role } from './types/userRole.type.js';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async register(email: string, password: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    await newUser.save();
  }

  // 로그인
  async login(email: string, password: string) {
    const user = await this.userModel
      .findOne({ email })
      .select(['email', 'password', 'role']);
    if (!user) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    // _id는 MongoDB의 고유 ID
    const payload = { id: user._id, email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 역할군 업데이트
  async updateRole(user: User, email: string, role: Role) {
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('유효하지 않은 역할입니다.');
    }

    if (user.email === email) {
      throw new BadRequestException('자기 자신에게 역할을 부여할 수 없습니다.');
    }

    const targetUser = await this.userModel.findOne({ email });
    if (_.isNil(targetUser)) {
      throw new BadRequestException('요청하신 사용자를 찾을 수 없습니다.');
    }

    // 역할군 Enum으로 변환
    targetUser.role = role;
    await targetUser.save();

    return { email: targetUser.email, role: targetUser.role };
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  // 관리자 수 조회
  async countAdmin() {
    return await this.userModel.countDocuments({ role: Role.Admin });
  }

  // 관리자 권한 부여
  async initAdmin(user: User, role: Role) {
    // 최초 서버 배포 시 관리자 한명만 부여 가능
    const adminCount = await this.countAdmin();
    if (adminCount > 0) {
      throw new BadRequestException('관리자는 한명만 부여할 수 있습니다.');
    }

    const targetUser = await this.findByEmail(user.email);
    if (_.isNil(targetUser)) {
      throw new BadRequestException('요청하신 사용자를 찾을 수 없습니다.');
    }

    targetUser.role = role;
    await targetUser.save();

    return { message: '관리자 권한이 부여되었습니다.' };
  }
}
