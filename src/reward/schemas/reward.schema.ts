import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RewardType } from '../types/reward.type.js';

export type RewardDocument = Reward & Document;

@Schema({ collection: 'rewards', timestamps: true })
export class Reward {
  @Prop({ type: Types.ObjectId, required: true, ref: 'events' })
  eventId: Types.ObjectId;

  @Prop({ required: true, enum: RewardType })
  category: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: false })
  autoExecute: boolean;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
