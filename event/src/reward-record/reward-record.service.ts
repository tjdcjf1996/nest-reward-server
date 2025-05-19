import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RewardRecord,
  RewardRecordDocument,
} from './schemas/reward-record.schema';
import { CreateRewardRecordDto } from './dto/create-reward-record.dto';
import { CheckRecord } from './dto/check-reward.dto';
import { RewardStatus } from '../types/rewardStatus.type';
import { UpdateRewardRecordDto } from 'src/reward-record/dto/update-reward-record.dto.js';

@Injectable()
export class RewardRecordService {
  constructor(
    @InjectModel(RewardRecord.name)
    private readonly rewardRecordModel: Model<RewardRecordDocument>,
  ) {}

  // 보상 기록 생성
  async createRewardRecord(createRewardRecordDto: CreateRewardRecordDto) {
    const rewardRecord = new this.rewardRecordModel(createRewardRecordDto);
    return await rewardRecord.save();
  }

  // 중복 보상지급 방지용
  async checkRecord(checkRecord: CheckRecord): Promise<boolean> {
    const { userEmail, eventId } = checkRecord;
    const existingRecord = await this.rewardRecordModel
      .countDocuments({ userEmail, eventId })
      .exec();

    return existingRecord > 0;
  }

  // 본인 보상 기록 조회
  async findByUserEmail(userEmail: string): Promise<RewardRecordDocument[]> {
    const data = await this.rewardRecordModel
      .find({ userEmail })
      .populate('eventId', 'title description')
      .select('eventId eventName rewardStatus rewardedAt')
      .exec();

    return this.customDataProcessing(data);
  }

  // 어드민 수락용 보상 기록 조회
  async findPendingByAdmin(): Promise<RewardRecordDocument[]> {
    const data = await this.rewardRecordModel
      .find({ rewardStatus: RewardStatus.pending })
      .populate('eventId', 'title description')
      .select('eventId eventName createdAt userEmail')
      .sort({ createdAt: -1 })
      .exec();

    return this.customDataProcessing(data);
  }

  // 보상 기록 조회 (어드민, 감사자용)
  // 감사자는 pending 상태의 보상 기록을 제외하고 조회
  // 어드민은 모든 보상 기록을 조회
  async findAllUserRewardRecord(
    includePending: boolean = false,
  ): Promise<RewardRecordDocument[]> {
    const query = includePending
      ? {}
      : { rewardStatus: { $ne: RewardStatus.pending } };

    const data = await this.rewardRecordModel
      .find(query)
      .populate('eventId', 'title description')
      .select('eventId eventName rewardStatus rewardedAt userEmail')
      .sort({ createdAt: -1 })
      .exec();

    return this.customDataProcessing(data);
  }

  // pending 상태의 특정 사용자 보상 기록 조회
  async findPendingByUser(
    checkRecord: CheckRecord,
  ): Promise<RewardRecordDocument | null> {
    const { userEmail, eventId } = checkRecord;
    return await this.rewardRecordModel
      .findOne({ userEmail, rewardStatus: RewardStatus.pending, eventId })
      .exec();
  }

  // pending 상태의 특정 사용자 completed로 변경 메서드
  async updatePendingToCompleted(
    updateRewardRecordDto: UpdateRewardRecordDto,
  ): Promise<RewardRecordDocument | null> {
    const { userEmail, eventId, rewardedAt } = updateRewardRecordDto;
    return await this.rewardRecordModel
      .findOneAndUpdate(
        { userEmail, rewardStatus: RewardStatus.pending, eventId },
        { rewardStatus: RewardStatus.completed, rewardedAt },
        { new: true },
      )
      .exec();
  }

  // 데이터 가공용
  customDataProcessing(data: any[]): any[] {
    return data.map((record) => {
      const event = record.eventId as any;
      return {
        ...record.toObject(),
        eventId: event._id ?? event,
        eventName: event.title ?? '',
        rewardStatus: record.rewardStatus,
        rewardedAt: record.rewardedAt,
        createdAt: record.createdAt,
      };
    });
  }
}
