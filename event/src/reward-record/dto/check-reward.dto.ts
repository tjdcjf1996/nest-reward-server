import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

/**
 * @description 중복 지급 방지 확인용 DTO
 * @property {string} userEmail - 사용자 이메일
 * @property {string} eventId - 이벤트 아이디
 */
export class CheckRecord {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  userEmail: string;

  @IsMongoId()
  @IsNotEmpty({ message: '이벤트 아이디를 입력해주세요.' })
  eventId: string;
}
