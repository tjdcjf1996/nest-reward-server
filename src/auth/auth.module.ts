import { UserModule } from 'src/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from 'src/config/db/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync(jwtConfig),
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
