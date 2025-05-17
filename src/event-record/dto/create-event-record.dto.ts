import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

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
