import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type EventRecordDocument = EventRecord & Document;

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
