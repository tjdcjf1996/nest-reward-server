import {
  IsString,
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { EventStatusType } from '../../types/eventStatus.type';
import { EventType } from '../../types/event.type';

/**
 * @description 이벤트 생성 DTO
 * @property {string} title - 이벤트 제목
 * @property {string} description - 이벤트 설명 (optional)
 * @property {string} startAt - 이벤트 시작일 (UTC 기준)
 * @property {string} endAt - 이벤트 종료일 (UTC 기준)
 * @property {EventStatusType} status - 이벤트 상태
 * @property {EventType} type - 이벤트 타입
 * @property {Record<string, any>} contents - 이벤트에 따른 추가 데이터
 * @property {boolean} autoExecute - 리워드 지급 방식 자동 여부
 */

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

  @IsEnum(EventStatusType)
  @IsNotEmpty({ message: '이벤트 상태를 입력해주세요.' })
  status: EventStatusType;

  @IsEnum(EventType)
  @IsNotEmpty({ message: '이벤트 타입을 입력해주세요.' })
  type: EventType;

  @IsOptional()
  @IsObject()
  contents?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  autoExecute: boolean;
}
