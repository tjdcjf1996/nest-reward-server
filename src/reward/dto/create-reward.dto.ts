import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
} from 'class-validator';
import { RewardType } from '../types/reward.type.js';

export class CreateRewardDto {
  @IsMongoId()
  eventId: string;

  @IsEnum(RewardType)
  category: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  autoExecute: boolean;
}
