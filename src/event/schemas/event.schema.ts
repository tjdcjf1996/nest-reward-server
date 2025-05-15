import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    enum: ['active', 'inactive', 'closed'],
    default: 'inactive',
  })
  status: string;

  // 이벤트 타입
  @Prop({ required: true })
  type: string;

  // 이벤트 방식
  @Prop({ type: Map, of: String })
  contents: Record<string, string>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
