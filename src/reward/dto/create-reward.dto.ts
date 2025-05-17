import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { RewardType } from '../../types/reward.type';
import { CouponRewardDto } from './coupon-reward.dto';
import { IsRewardDataConstraint } from './validator/reward-data.validator';

export class CreateRewardDto {
  @IsMongoId()
  eventId: string;

  @IsEnum(RewardType, {
    message: '유효한 리워드 타입을 입력해주세요. (item, coupon, point, cash)',
  })
  rewardType: RewardType;

  @IsNumber()
  amount: number;

  @IsBoolean()
  autoExecute: boolean;

  @IsOptional()
  @Validate(IsRewardDataConstraint)
  rewardData?: CouponRewardDto;
}
