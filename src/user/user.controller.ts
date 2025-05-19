import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schema.js';
import { Role } from './types/userRole.type.js';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { RoleUpdateDto } from './dto/roleUpdate.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() loginDto: LoginDto) {
    await this.userService.register(loginDto.email, loginDto.password);
    return {
      message: '회원가입이 완료되었습니다.',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @Delete()
  async deleteUser(@UserInfo() user: User) {
    return await this.userService.deleteUser(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch('role')
  async roleUpdate(
    @UserInfo() user: User,
    @Body() roleUpdateDto: RoleUpdateDto,
  ) {
    return await this.userService.updateRole(
      user,
      roleUpdateDto.targetEmail,
      roleUpdateDto.targetRole,
    );
  }

  @UseGuards(RolesGuard)
  @Patch('role/admin')
  async roleUpdateAdmin(@UserInfo() user: User) {
    return await this.userService.initAdmin(user, Role.Admin);
  }
}
