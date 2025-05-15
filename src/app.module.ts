import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/env/validation.config.js';
import databaseConfig from './config/env/database.config.js';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoURI } from './config/db/database.config.js';

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
    // Event 모듈 추가
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
