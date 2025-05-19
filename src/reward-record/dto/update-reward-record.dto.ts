import { PartialType } from '@nestjs/mapped-types';

import { IsOptional, IsDateString } from 'class-validator';
import { CheckRecord } from './check-reward.dto';

export class UpdateRewardRecordDto extends PartialType(CheckRecord) {
  @IsDateString()
  rewardedAt: Date;
}
