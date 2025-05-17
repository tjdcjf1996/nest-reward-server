import { IsDateString, IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class EventExecuteDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  userEmail: string;

  @IsMongoId()
  @IsNotEmpty({ message: '이벤트 아이디를 입력해주세요.' })
  eventId: string;

  @IsDateString()
  @IsNotEmpty({ message: '수행 날짜를 입력해주세요.' })
  executionDate: string;

  eventData: Record<string, any>;
}
