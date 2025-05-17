import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { Reward, RewardSchema } from './schemas/reward.schema.js';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    EventModule,
  ],
  exports: [RewardService],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
