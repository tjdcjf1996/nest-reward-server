import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * @description 이벤트 실행 DTO
 * @property {string} userEmail - 사용자 이메일
 * @property {string} eventId - 이벤트 아이디
 * @property {Record<string, any>} eventData - 이벤트에 따른 추가 데이터 (optional)
 */
export class EventExecuteDto {
  @IsEmail()
  @IsOptional()
  userEmail?: string;

  @IsMongoId()
  @IsNotEmpty({ message: '이벤트 아이디를 입력해주세요.' })
  eventId: string;

  eventData?: Record<string, any>;
}
