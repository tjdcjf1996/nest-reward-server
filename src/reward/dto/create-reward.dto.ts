import { IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { RewardType } from '../../types/reward.type';

/**
 * @description 리워드 생성 DTO
 * @property {string} eventId - 이벤트 ID
 * @property {RewardType} rewardType - 리워드 타입 (item, coupon, point, cash)
 * @property {number} amount - 리워드 수량
 * @property {CouponRewardDto} rewardData - 리워드 데이터 (optional)
 */
export class CreateRewardDto {
  @IsMongoId()
  eventId: string;

  @IsEnum(RewardType, {
    message: '유효한 리워드 타입을 입력해주세요. (item, coupon, point, cash)',
  })
  rewardType: RewardType;

  @IsNumber()
  amount: number;

  @IsOptional()
  rewardData?: any;
}
