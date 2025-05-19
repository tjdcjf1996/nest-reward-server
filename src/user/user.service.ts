import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpClientService } from '../utils/httpClient/http-client.service';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateRoleDto } from '../user/dto/update-role.dto';
import { tokenToHeaders } from '../utils/util/token-to-headers.util';

@Injectable()
export class UserService {
  constructor(
    private readonly http: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  private get authServerUrl() {
    return this.configService.get<string>('AUTH_SERVER');
  }

  async register(createUserDto: CreateUserDto) {
    return this.http.post(`${this.authServerUrl}/user/register`, createUserDto);
  }
  async login(loginUserDto: LoginUserDto) {
    return this.http.post(`${this.authServerUrl}/user/login`, loginUserDto);
  }

  async delete(token: string | undefined) {
    return this.http.delete(
      `${this.authServerUrl}/user`,
      tokenToHeaders(token),
    );
  }

  // 권한 변경 메서드 ( 어드민 전용 )
  async updateRole(updateRoleDto: UpdateRoleDto, token: string | undefined) {
    return this.http.patch(
      `${this.authServerUrl}/user/role`,
      updateRoleDto,
      tokenToHeaders(token),
    );
  }

  // 어드민 권한 부여 메서드 ( 최초 서버 부팅 시 어드민 권한 부여, 아무도 없을 때만 가능 )
  // 임시용 ( db 내 변경하는 방식 이용 시 삭제 요망 )
  async updateAdminRole(token: string | undefined) {
    return this.http.patch(
      `${this.authServerUrl}/user/role/admin`,
      {},
      tokenToHeaders(token),
    );
  }
}
