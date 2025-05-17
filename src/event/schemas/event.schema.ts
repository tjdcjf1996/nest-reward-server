import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventStatusType } from '../../types/eventStatus.type';
import { EventType } from '../../types/event.type';

export type EventDocument = Event & Document;

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

  // 이벤트 상태
  @Prop({
    required: true,
    enum: EventStatusType,
    default: 'inactive',
  })
  status: EventStatusType;

  // 이벤트 타입
  @Prop({
    required: true,
    enum: EventType,
  })
  type: EventType;

  // 이벤트 방식
  @Prop({ type: MongooseSchema.Types.Mixed, default: false })
  contents: Record<string, any>;

  // 삭제 여부
  @Prop({ default: null })
  deletedAt?: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
