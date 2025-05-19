import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * @description 보상 요청 DTO
 * @property {string} userEmail - 사용자 이메일
 * @property {string} eventId - 이벤트 아이디
 */
export class RewardExecuteDto {
  @IsEmail()
  @IsOptional()
  userEmail: string;

  @IsMongoId()
  @IsNotEmpty({ message: '이벤트 아이디를 입력해주세요.' })
  eventId: string;
}
