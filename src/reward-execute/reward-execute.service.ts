import { Injectable } from '@nestjs/common';
import { RewardExecuteDto } from './dto/rewardExecute.dto';
import { EventService } from '../event/event.service';
import { EventExecuteService } from '../event-execute/event-execute.service';
import { RewardService } from '../reward/reward.service';

@Injectable()
export class RewardExecuteService {
  constructor(
    private readonly eventService: EventService,
    private readonly eventExecuteService: EventExecuteService,
    private readonly rewardService: RewardService,
  ) {}

  // 이벤트 보상 지급 요청에 대한 서비스
  async executeReward(rewardExecuteDto: RewardExecuteDto): Promise<any> {
    const { eventId } = rewardExecuteDto;

    // 이벤트가 있는지 조회
    const event = await this.eventService.findById(rewardExecuteDto.eventId);

    // 이벤트에 해당하는 보상
    const rewards = await this.rewardService.findByEventId(eventId);
    if (rewards.length === 0) {
      return { message: '해당 이벤트에 대한 보상이 없습니다.' };
    }

    // 유저가 보상을 받을 수 있는지 확인
    const isValid = await this.eventExecuteService.validate(rewardExecuteDto);

    if (!isValid) {
      return { message: '보상 기준 미달입니다.' };
    }
    // 보상 지급

    // 보상 지급에 대한 로그 기록

    return { message: 'Rewards executed successfully' };
  }
}
