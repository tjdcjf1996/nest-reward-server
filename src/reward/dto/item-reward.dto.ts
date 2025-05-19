import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemRewardDto {
  @IsNotEmpty({ message: '아이템 ID는 필수입니다.' })
  @IsNumber({}, { message: '아이템 ID는 숫자이어야 합니다.' })
  itemId: number;

  @IsNotEmpty({ message: '아이템 ID는 필수입니다.' })
  @IsString({ message: '아이템 이름은 문자열이어야 합니다.' })
  name: string;
}
