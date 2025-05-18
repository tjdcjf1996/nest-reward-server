import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type EventRecordDocument = EventRecord & Document;

/**
 * @description EventRecord 스키마
 * @property {string} userEmail - 사용자 이메일
 * @property {Types.ObjectId} eventId - 이벤트 아이디
 * @property {Record<string, any>} eventData - 이벤트 데이터
 */
@Schema({ collection: 'event-records', timestamps: true })
export class EventRecord {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'events' })
  eventId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed, default: false })
  eventData: Record<string, any>;
}
export const EventRecordSchema = SchemaFactory.createForClass(EventRecord);
