import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventStatusType } from '../../types/eventStatus.type';
import { EventType } from '../../types/event.type';

export type EventDocument = Event & Document;

/**
 * @description Event 스키마
 * @property {string} title - 이벤트 제목
 * @property {string} description - 이벤트 설명 (optional)
 * @property {Date} startAt - 이벤트 시작일 (UTC 기준)
 * @property {Date} endAt - 이벤트 종료일 (UTC 기준)
 * @property {EventStatusType} status - 이벤트 상태
 * @property {EventType} type - 이벤트 타입
 * @property {Record<string, any>} contents - 이벤트에 따른 추가 데이터
 * @property {boolean} autoExecute - 리워드 지급 방식 자동 여부
 * @property {Date} deletedAt - 삭제일 (UTC 기준)
 */

@Schema({ collection: 'events', timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({
    required: true,
    enum: EventStatusType,
    default: 'inactive',
  })
  status: EventStatusType;

  @Prop({
    required: true,
    enum: EventType,
  })
  type: EventType;

  @Prop({ type: MongooseSchema.Types.Mixed, default: false })
  contents: Record<string, any>;

  @Prop({ default: true })
  autoExecute: boolean;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
