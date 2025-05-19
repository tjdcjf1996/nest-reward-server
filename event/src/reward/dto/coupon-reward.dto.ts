import { IsString } from 'class-validator';

export class CouponRewardDto {
  @IsString({ message: '쿠폰 이름은 문자열이어야 합니다.' })
  name: string;

  @IsString({ message: '쿠폰번호는 문자열이어야 합니다.' })
  number: number;
}
