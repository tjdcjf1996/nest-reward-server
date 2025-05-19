import { Injectable } from '@nestjs/common';
import { RewardExecuteDto } from './dto/rewardExecute.dto';
import { EventExecuteService } from '../event-execute/event-execute.service';
import { RewardService } from '../reward/reward.service';
import { RewardType } from '../types/reward.type';
import { RewardStatus } from '../types/rewardStatus.type';
import { Types } from 'mongoose';
import { RewardRecordService } from '../reward-record/reward-record.service';
import { EventService } from '../event/event.service';

type RewardData = {
  rewardId: Types.ObjectId;
  rewardType: RewardType;
  rewardData: Record<string, any>;
  amount: number;
};

type ExecuteResult = {
  rewardIds: Types.ObjectId[];
  rewardDatas: RewardData[];
  rewardStatus: RewardStatus;
  rewardedAt?: Date;
};

@Injectable()
export class RewardExecuteService {
  constructor(
    private readonly eventService: EventService,
    private readonly eventExecuteService: EventExecuteService,
    private readonly rewardService: RewardService,
    private readonly rewardRecordService: RewardRecordService,
  ) {}

  async executeReward(rewardExecuteDto: RewardExecuteDto): Promise<any> {
    const { eventId, userEmail } = rewardExecuteDto;

    // 이벤트에 대한 보상이 있는지 확인
    const rewards = await this.rewardService.findByEventId(eventId);
    if (rewards.length === 0) {
      return { message: '해당 이벤트에 대한 보상이 없습니다.' };
    }

    // 보상 지급 기준에 만족하는지 확인
    const isValid = await this.eventExecuteService.validate(rewardExecuteDto);
    if (!isValid) {
      return { message: '보상 기준 미달입니다.' };
    }

    // 중복 보상 지급 방지
    const checkRecord = await this.rewardRecordService.checkRecord({
      userEmail,
      eventId,
    });

    // 보상 지급 방식이 자동인지 수동인지 확인
    const autoExecute = await this.eventService.isAutoExecute(eventId);
    let executeResult: ExecuteResult;

    if (checkRecord) {
      return autoExecute
        ? { message: '이미 보상을 지급받았습니다.' }
        : { message: '보상 지급 신청이 완료되었습니다.' };
    }

    // 보상 지급 방식에 따라 분리
    if (autoExecute) {
      executeResult = await this.executeAutomaticReward(rewards);
    } else {
      executeResult = await this.executeManualReward(rewards);
    }

    // 명시적으로 필요한 필드만 추출
    const dto = {
      userEmail,
      eventId,
      rewardIds: executeResult.rewardIds,
      rewardDatas: executeResult.rewardDatas,
      rewardStatus: executeResult.rewardStatus,
      rewardedAt: executeResult.rewardedAt,
    };

    // 보상 지급기록 생성
    await this.rewardRecordService.createRewardRecord(dto);

    return autoExecute
      ? { message: '보상 지급완료' }
      : { message: '보상 지급 신청 완료' };
  }

  // pending 상태 보상지급 메서드
  async executePendingReward(rewardExecuteDto: RewardExecuteDto): Promise<any> {
    const { eventId, userEmail } = rewardExecuteDto;

    if (!userEmail) {
      return { message: '보상 지급할 이메일을 입력해주세요.' };
    }

    // 이벤트에 대한 보상이 있는지 확인
    const rewards = await this.rewardService.findByEventId(eventId);
    if (rewards.length === 0) {
      return { message: '해당 이벤트에 대한 보상이 없습니다.' };
    }

    // 지급 내역이 있는지 확인
    const checkRecord = await this.rewardRecordService.findPendingByUser({
      userEmail,
      eventId,
    });

    if (!checkRecord) {
      return { message: '요청한 데이터가 없습니다.' };
    }

    // 보상 지급
    await this.rewardExecute(rewards);

    // 명시적으로 필요한 필드만 추출
    const dto = {
      userEmail,
      eventId,
      rewardedAt: new Date(),
    };

    // 보상 지급기록 생성
    const response =
      await this.rewardRecordService.updatePendingToCompleted(dto);
    if (!response) {
      return { message: '보상 지급 기록 업데이트 실패' };
    }

    return { message: `${userEmail} : ${eventId} 보상 지급 완료` };
  }

  // 보상 지급 결과를 생성하는 메서드
  private buildRewardResult(
    rewards: any[],
    extra: Partial<Omit<ExecuteResult, 'rewardIds' | 'rewardDatas'>> = {},
  ): ExecuteResult {
    const rewardIds: Types.ObjectId[] = [];
    const rewardDatas: RewardData[] = [];

    for (const reward of rewards) {
      const { _id, rewardType, rewardData, amount } = reward;
      rewardIds.push(_id);
      rewardDatas.push({ rewardId: _id, rewardType, rewardData, amount });
    }

    return {
      rewardIds,
      rewardDatas,
      rewardStatus: extra.rewardStatus ?? RewardStatus.completed,
      rewardedAt: extra.rewardedAt,
    };
  }

  // 자동 보상 지급 메서드 (유저 요청용)
  async executeAutomaticReward(rewards: any[]): Promise<ExecuteResult> {
    // 보상 지급
    await this.rewardExecute(rewards);
    return this.buildRewardResult(rewards, {
      rewardedAt: new Date(),
    });
  }

  // 수동 보상 지급 메서드 (유저 요청용)
  async executeManualReward(rewards: any[]): Promise<ExecuteResult> {
    return this.buildRewardResult(rewards, {
      rewardStatus: RewardStatus.pending,
    });
  }

  // 보상 지급 메서드
  async rewardExecute(rewards: any[]): Promise<void> {
    {
      for (const reward of rewards) {
        switch (reward.rewardType) {
          case RewardType.item:
            console.log(
              `${reward.rewardData.name} 아이템 ${reward.amount}개 지급`,
            );
            break;
          case RewardType.coupon:
            console.log(
              `${reward.rewardData.name} 쿠폰 ${reward.amount}개 지급`,
            );
            break;
          default:
            console.log(`${reward.amount} ${reward.rewardType} 지급`);
        }
      }
    }
  }
}
