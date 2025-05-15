import {
  IsString,
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { EventType } from '../types/event.type.js';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: '이벤트명을 입력해주세요.' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty({ message: '시작 날짜를 입력해주세요.' })
  startAt: string;

  @IsDateString()
  @IsNotEmpty({ message: '종료 날짜를 입력해주세요.' })
  endAt: string;

  @IsEnum(EventType)
  @IsNotEmpty({ message: '이벤트 상태를 입력해주세요.' })
  status: string;

  @IsString()
  @IsNotEmpty({ message: '이벤트 타입을 입력해주세요.' })
  type: string;

  @IsOptional()
  @IsObject()
  contents?: Record<string, string>;
}
