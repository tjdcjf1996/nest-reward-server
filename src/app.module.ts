import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { RewardRecordModule } from './reward-record/reward-record.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/env/validation.config';
import { HttpClientModule } from './utils/httpClient/http-client.module';

const configModuleSetting = {
  validationSchema,
  load: [],
  isGlobal: true,
};

const throttlerModuleSetting = [
  {
    ttl: 60000,
    limit: 10,
  },
];

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerModuleSetting),
    ConfigModule.forRoot(configModuleSetting),
    AuthModule,
    UserModule,
    EventModule,
    RewardModule,
    RewardRecordModule,
    HttpClientModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AppService,
  ],
})
export class AppModule {}
