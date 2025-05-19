import * as _ from 'lodash';
import { EventExecuteDto } from '../dto/eventExecute.dto';
import { EventStrategy } from './decorator/event.strategy.decorator';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { EventRecordService } from '../../event-record/event-record.service';

@EventStrategy('invite')
export class InviteStrategy {
  constructor(private readonly eventRecordService: EventRecordService) {}
  async handle(eventExecuteDto: EventExecuteDto): Promise<any> {
    // 추천인 등록 로직 처리
    // 한 유저는 한번만 추천인 등록 가능

    // 추가 데이터가 있는지 확인
    if (
      _.isNil(eventExecuteDto.eventData) ||
      _.isNil(eventExecuteDto.eventData.referrerEmail)
    )
      throw new BadRequestException('이벤트 데이터가 없습니다.');

    const {
      eventId,
      userEmail,
      eventData: { referrerEmail },
    } = eventExecuteDto;

    // 자기 자신은 추천인으로 등록할 수 없음
    if (userEmail === referrerEmail) {
      throw new BadRequestException(
        '자기 자신을 추천인으로 등록할 수 없습니다.',
      );
    }

    // 이벤트에 참여했는지 확인
    const isParticipation = await this.eventRecordService.countByCondition({
      userEmail,
      eventId,
    });
    if (isParticipation > 0) {
      throw new ConflictException('이미 추천인 이벤트에 참여하셨습니다.');
    }

    // 추천인 등록 처리 ( TODO: 추후 kafka로 실제 있는 추천인인지 확인 )
    await this.eventRecordService.create({
      userEmail,
      eventId,
      eventData: {
        referrerEmail,
      },
    });

    return { message: '추천인 이벤트 참여 완료!' };
  }
  async validate(
    eventExecuteDto: EventExecuteDto,
    contents: Record<string, any>,
  ): Promise<boolean> {
    const { userEmail, eventId } = eventExecuteDto;

    // 추천인 수 확인을 contents에서 확인
    if (_.isNil(contents.referrerCount)) {
      Logger.error(
        `[중요] EventID - ${eventId} : 이벤트 내용이 없습니다.`,
        'InviteStrategy',
      );
      return false;
    }

    // 추천인 수 확인
    const referrerCount = await this.eventRecordService.countByCondition({
      eventId,
      'eventData.referrerEmail': userEmail,
    });

    return referrerCount >= contents.referrerCount;
  }
}
