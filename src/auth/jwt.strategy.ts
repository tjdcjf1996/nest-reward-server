import * as _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY') || 'default',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // const serverTokenHeader = req.headers['msa-server-token'];
    // const serverToken = Array.isArray(serverTokenHeader)
    //   ? serverTokenHeader[0]
    //   : serverTokenHeader;

    // if (_.isNil(serverToken)) {
    //   throw new NotFoundException('서버 토큰이 없습니다.');
    // }

    // const decodedToken = this.jwtService.verify(serverToken);
    // if (_.isNil(decodedToken) || decodedToken.role !== 'gateway') {
    //   throw new NotFoundException('유효하지 않은 서버 토큰입니다.');
    // }

    return payload;
  }
}
