import {
  validateSync,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RewardType } from '../../../types/reward.type';
import { ItemRewardDto } from '../item-reward.dto';
import { CouponRewardDto } from '../coupon-reward.dto';
import { plainToInstance } from 'class-transformer';

@ValidatorConstraint({ name: 'isRewardData', async: false })
export class IsRewardDataConstraint implements ValidatorConstraintInterface {
  validate(_, args: ValidationArguments) {
    const rewardType: RewardType = (args.object as any).rewardType;
    const rewardData: any = (args.object as any).rewardData;

    const dtoMap = {
      item: ItemRewardDto,
      coupon: CouponRewardDto,
    };

    if (dtoMap[rewardType]) {
      const dto = dtoMap[rewardType];
      const instance = plainToInstance(dto, rewardData);
      const errors = validateSync(instance, { whitelist: true });
      return errors.length === 0;
    }
    return true;
  }

  defaultMessage(): string {
    return `리워드 데이터가 유효하지 않습니다.`;
  }
}
