import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/env/validation.config.js';
import databaseConfig from './config/env/database.config.js';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { mongoURI } from './config/db/database.config.js';
import { MongooseModule } from '@nestjs/mongoose';

const configModuleSetting = {
  validationSchema,
  load: [databaseConfig],
  isGlobal: true,
};

@Module({
  imports: [
    // env 모듈 추가
    ConfigModule.forRoot(configModuleSetting),
    // mongoDB 연결
    MongooseModule.forRootAsync(mongoURI),
    // auth 모듈 추가
    AuthModule,
    // user 모듈 추가
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
