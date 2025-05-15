import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/env/database.config.js';
import { mongoURI } from './config/db/database.config.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
    // mongoDB 연결
    MongooseModule.forRootAsync(mongoURI),
})
export class AppModule {}
