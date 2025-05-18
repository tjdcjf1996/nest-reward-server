import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/public/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Patch('role')
  updateRole(@Body() updateRoleDto: UpdateRoleDto, @Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음

    return this.userService.updateRole(updateRoleDto, token);
  }

  @Patch('/role/admin')
  updateAdminRole(@Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음

    return this.userService.updateAdminRole(token);
  }
}
