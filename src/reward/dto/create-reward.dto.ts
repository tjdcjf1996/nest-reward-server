import { IsBoolean, IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { RewardType } from '../../types/reward.type';

export class CreateRewardDto {
  @IsMongoId()
  eventId: string;

  @IsEnum(RewardType)
  category: RewardType;

  @IsNumber()
  amount: number;

  @IsBoolean()
  autoExecute: boolean;
}
