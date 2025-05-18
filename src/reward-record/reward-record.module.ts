import { Module } from '@nestjs/common';
import { RewardRecordService } from './reward-record.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardRecord,
  RewardRecordSchema,
} from './schemas/reward-record.schema';
import { RewardRecordController } from './reward-record.controller';
import { Reward, RewardSchema } from '../reward/schemas/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardRecord.name, schema: RewardRecordSchema },
      { name: Reward.name, schema: RewardSchema },
    ]),
  ],
  exports: [RewardRecordService],
  providers: [RewardRecordService],
  controllers: [RewardRecordController],
})
export class RewardRecordModule {}
