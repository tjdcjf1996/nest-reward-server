import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventTypeStrategy } from './strategies/interface/event.strategy.interface';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { EVENT_TYPE_METADATA } from './strategies/decorator/event.strategy.decorator';
import { EventExecuteDto } from './dto/eventExecute.dto';
import { EventService } from '../event/event.service';
import * as _ from 'lodash';

@Injectable()
export class EventExecuteService implements OnModuleInit {
  private strategyMap = new Map<string, EventTypeStrategy>();
  constructor(
    private readonly eventService: EventService,
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper?.instance;

      if (_.isNil(instance)) continue;

      const type = this.reflector.get<string>(
        EVENT_TYPE_METADATA,
        instance.constructor,
      );
      const isValid = typeof instance?.handle === 'function';

      if (type && isValid) {
        this.strategyMap.set(type, instance);
      }
    }
  }

  async execute(eventExecuteDto: EventExecuteDto): Promise<any> {
    const { eventId } = eventExecuteDto;

    const event = await this.eventService.findById(eventId);
    // 해당 이벤트 없으면 이벤트 서비스 내에서 에러처리

    const startAt = event.startAt;
    const endAt = event.endAt;
    const status = event.status;
    const now = new Date();

    if (startAt > now || endAt < now || status !== 'active') {
      return { message: '이벤트 기간이 아닙니다.' };
    }

    const type = event.type;

    const strategy = this.strategyMap.get(type);

    if (_.isNil(strategy)) {
      return { message: '해당 이벤트에 대한 핸들러가 없습니다.' };
    }

    return await strategy.handle(eventExecuteDto);
  }

  async validate(eventExecuteDto: EventExecuteDto): Promise<any> {
    const { eventId } = eventExecuteDto;

    const event = await this.eventService.findById(eventId);
    // 해당 이벤트 없으면 이벤트 서비스 내에서 에러처리

    const type = event.type;
    let contents = {};
    if (!_.isNil(event.contents)) {
      contents = event.contents;
    }

    const strategy = this.strategyMap.get(type);

    if (_.isNil(strategy)) {
      return { message: '해당 이벤트에 대한 핸들러가 없습니다.' };
    }

    return await strategy.validate(eventExecuteDto, contents);
  }
}
