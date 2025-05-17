import { Injectable } from '@nestjs/common';
import { EventStrategy } from './decorator/event.strategy.decorator';
import { EventTypeStrategy } from './interface/event.strategy.interface';
import { EventExecuteDto } from '../dto/eventExecute.dto';

@EventStrategy('attendance')
@Injectable()
export class AttendanceStrategy implements EventTypeStrategy {
  // 출석체크 이벤트

  async handle(eventExecuteDto: EventExecuteDto): Promise<boolean> {
    // TODO: 출석체크 이벤트 핸들링 로직
    const { userEmail } = eventExecuteDto;
    console.log(`${userEmail} 출석체크 이벤트 테스트`);
    return true;
  }
}
