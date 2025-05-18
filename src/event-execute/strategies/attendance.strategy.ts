import { Injectable } from '@nestjs/common';
import { EventStrategy } from './decorator/event.strategy.decorator';
import { EventTypeStrategy } from './interface/event.strategy.interface';
import { EventExecuteDto } from '../dto/eventExecute.dto';
import { EventRecordService } from '../../event-record/event-record.service';
import * as _ from 'lodash';

@EventStrategy('attendance')
@Injectable()
export class AttendanceStrategy implements EventTypeStrategy {
  constructor(private readonly eventRecordService: EventRecordService) {}
  // 출석체크 이벤트

  async handle(eventExecuteDto: EventExecuteDto): Promise<any> {
    // TODO: 출석체크 이벤트 핸들링 로직
    const { userEmail, eventId } = eventExecuteDto;

    // 오늘 출석체크 여부 확인
    const now = new Date();
    const startDay = new Date(now.setHours(0, 0, 0, 0));
    const endDay = new Date(now.setHours(23, 59, 59, 999));

    const isAttendance = await this.eventRecordService.countByCondition({
      userEmail,
      eventId,
      createdAt: {
        $gte: startDay,
        $lte: endDay,
      },
    });

    // 출석체크를 했다면 false 반환
    if (isAttendance > 0) {
      return { message: '이미 출석체크를 하셨습니다.' };
    } else {
      // 출석체크를 하지 않았다면 출석체크 처리
      await this.eventRecordService.create({
        userEmail,
        eventId,
      });
    }

    // 출석체크를 하지 않았으면 출석체크 처리
    return { message: '출석체크 완료' };
  }

  async validate(
    eventExecuteDto: EventExecuteDto,
    contents: Record<string, any>,
  ): Promise<boolean> {
    const { userEmail, eventId } = eventExecuteDto;

    // 몇일 참여 이벤트인지 contents에서 확인
    if (_.isNil(contents.days)) {
      console.error(`[중요] EventID - ${eventId} : 이벤트 내용이 없습니다.`);
      return false;
    }

    const days = contents.days;

    const attendedDays = await this.eventRecordService.countByCondition({
      userEmail,
      eventId,
    });

    return attendedDays >= days ? true : false;
  }
}
