import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/env/validation.config';
import databaseConfig from './config/env/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoURI } from './config/db/database.config';
import { EventExecuteModule } from './event-execute/event-execute.module';
import { RewardModule } from './reward/reward.module';
import { EventRecordModule } from './event-record/event-record.module';
import { RewardExecuteModule } from './reward-execute/reward-execute.module';
import { RewardRecordModule } from './reward-record/reward-record.module';

const configModuleSetting = {
  validationSchema,
  load: [databaseConfig],
  isGlobal: true,
};

@Module({
  imports: [
    // env 모듈 추가
    ConfigModule.forRoot(configModuleSetting),
    // MongoDB 모듈 추가
    MongooseModule.forRootAsync(mongoURI),
    // 각 모듈 추가
    EventModule,
    EventExecuteModule,
    RewardModule,
    EventRecordModule,
    RewardExecuteModule,
    RewardRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
