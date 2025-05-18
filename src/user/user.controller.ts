import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return 'test';
    //return this.userService.login(createUserDto);
  }

  @Patch('role')
  updateRole() {
    //return this.userService.updateRole(updateUserDto);
    return 'test';
  }

  @Patch('/role/admin')
  updateAdminRole() {
    //return this.userService.updateAdminRole(updateUserDto);
    return 'test';
  }
}
