import { Controller } from '@nestjs/common';
import { RewardRecordService } from './reward-record.service';

@Controller('reward-record')
export class RewardRecordController {
  constructor(private readonly rewardRecordService: RewardRecordService) {}
}
