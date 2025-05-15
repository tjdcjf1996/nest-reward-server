import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

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

  // 이메일로 사용자 찾기
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
