import { ConfigService } from '@nestjs/config';

export const jwtConfig = {
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: '1m',
    },
  }),
  inject: [ConfigService],
};
