import { Module } from '@nestjs/common';
import { RewardRecordService } from './reward-record.service';
import { RewardRecordController } from './reward-record.controller';

@Module({
  controllers: [RewardRecordController],
  providers: [RewardRecordService],
})
export class RewardRecordModule {}
