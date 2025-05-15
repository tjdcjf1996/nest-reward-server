import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
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
    return await this.userService.register(loginDto.email, loginDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  }
}
