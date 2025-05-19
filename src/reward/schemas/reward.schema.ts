import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { RewardType } from '../../types/reward.type';

export type RewardDocument = Reward & Document;

/**
 * @description Reward 스키마
 * @property {Types.ObjectId} eventId - 이벤트 아이디
 * @property {RewardType} rewardType - 리워드 타입
 * @property {Record<string, any>} rewardData - 리워드 데이터
 * @property {number} amount - 리워드 수량
 * @property {Date} deletedAt - 삭제일 (UTC 기준)
 */
@Schema({ collection: 'rewards', timestamps: true })
export class Reward {
  @Prop({ type: Types.ObjectId, required: true, ref: 'events' })
  eventId: Types.ObjectId;

  @Prop({ required: true, enum: RewardType })
  rewardType: RewardType;

  @Prop({ type: MongooseSchema.Types.Mixed, default: false })
  rewardData: Record<string, any>;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
