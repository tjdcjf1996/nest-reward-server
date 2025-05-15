import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema.js';
import { UserService } from './user.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConfig } from 'src/config/db/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
