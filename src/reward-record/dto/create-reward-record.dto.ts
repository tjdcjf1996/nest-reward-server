import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';
import { RewardStatus } from '../../types/rewardStatus.type';

/**
 * @description 리워드 지급 기록 생성 DTO
 * @property {string} userEmail - 사용자 이메일
 * @property {string} eventId - 이벤트 아이디
 * @property {Types.ObjectId[]} rewardIds - 리워드 아이디 배열
 * @property {Record<string, any>[]} rewardDatas - 리워드 데이터 배열
 * @property {RewardStatus} rewardStatus - 리워드 지급 상태 (optional)
 * @property {Date} rewardedAt - 리워드 지급 일시 (optional)
 */

export class CreateRewardRecordDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  userEmail: string;

  @IsMongoId()
  @IsNotEmpty({ message: '이벤트 아이디를 입력해주세요.' })
  eventId: string;

  @IsMongoId()
  @IsNotEmpty({ message: '리워드 아이디를 입력해주세요.' })
  rewardIds: Types.ObjectId[];

  @IsNotEmpty({ message: '보상 데이터를 입력해주세요.' })
  rewardDatas: Record<string, any>[];

  @IsOptional()
  @IsEnum(RewardStatus)
  rewardStatus: RewardStatus;

  @IsOptional()
  @IsDateString()
  rewardedAt?: Date;
}
