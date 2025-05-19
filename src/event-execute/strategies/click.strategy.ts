import * as _ from 'lodash';
import { EventExecuteDto } from '../dto/eventExecute.dto';
import { EventStrategy } from './decorator/event.strategy.decorator';
import { EventRecordService } from '../../event-record/event-record.service';

@EventStrategy('click')
export class ClickStrategy {
  constructor(private readonly eventRecordService: EventRecordService) {}
  async handle(eventExecuteDto: EventExecuteDto): Promise<any> {
    // 클릭 이벤트 처리 로직

    const { eventId, userEmail } = eventExecuteDto;

    // 이벤트에 참여했는지 확인
    const isParticipation = await this.eventRecordService.countByCondition({
      userEmail,
      eventId,
    });
    if (isParticipation > 0) {
      return { message: '이미 클릭 이벤트에 참여하셨습니다.' };
    }

    // 클릭 이벤트 등록 처리
    await this.eventRecordService.create({
      userEmail,
      eventId,
    });

    return { message: '클릭 이벤트 참여 완료!' };
  }
  async validate(eventExecuteDto: EventExecuteDto): Promise<boolean> {
    const { userEmail, eventId } = eventExecuteDto;

    // 클릭 확인
    const clickCount = await this.eventRecordService.countByCondition({
      eventId,
      userEmail,
    });

    return clickCount > 0;
  }
}
