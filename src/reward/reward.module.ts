import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { Reward, RewardSchema } from './schemas/reward.schema.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
