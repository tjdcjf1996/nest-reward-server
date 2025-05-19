import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * @description 이벤트 기록 생성 DTO
 * @property {string} userEmail - 사용자 이메일
 * @property {string} eventId - 이벤트 ID
 * @property {Record<string, any>} eventData - 이벤트에 따른 추가 데이터 (optional)
 */
export class CreateEventRecordDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  userEmail: string;

  @IsMongoId()
  @IsNotEmpty({ message: '이벤트 ID를 입력해주세요.' })
  eventId: string;

  @IsOptional()
  eventData?: Record<string, any>;
}
