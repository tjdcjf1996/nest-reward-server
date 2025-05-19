import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RewardStatus } from '../../types/rewardStatus.type';

export type RewardRecordDocument = RewardRecord & Document;

/**
 * @description 리워드 지급 기록 스키마
 * @property {Types.ObjectId} eventId - 이벤트 아이디
 * @property {Types.ObjectId[]} rewardIds - 리워드 아이디 배열
 * @property {string} userEmail - 사용자 이메일
 * @property {Record<string, any>[]} rewardDatas - 리워드 데이터 배열
 * @property {RewardStatus} rewardStatus - 리워드 지급 상태
 * @property {Date} rewardedAt - 리워드 지급 일시 (optional)
 */
@Schema({ collection: 'reward-recodes', timestamps: true })
export class RewardRecord {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'Reward' })
  rewardIds: Types.ObjectId[];

  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: Object, required: true })
  rewardDatas: Record<string, any>[];

  @Prop({ enum: RewardStatus, default: RewardStatus.completed })
  rewardStatus: RewardStatus;

  @Prop({ default: null })
  rewardedAt?: Date;
}

export const RewardRecordSchema = SchemaFactory.createForClass(RewardRecord);
