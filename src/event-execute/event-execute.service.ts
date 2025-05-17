import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventTypeStrategy } from './strategies/interface/event.strategy.interface';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { EVENT_TYPE_METADATA } from './strategies/decorator/event.strategy.decorator';
import { EventExecuteDto } from './dto/eventExecute.dto';
import { EventService } from '../event/event.service';

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

      if (!instance) continue;

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

  async execute(eventExecuteDto: EventExecuteDto): Promise<boolean> {
    const { eventId } = eventExecuteDto;

    const event = await this.eventService.findById(eventId);
    if (!event) {
      // TODO: 이벤트가 존재하지 않는 경우 에러 반환
      return false;
    }

    const type = event.type;

    const strategy = this.strategyMap.get(type);

    if (!strategy) {
      // TODO: 해당 이벤트 타입에 대한 핸들러가 등록되어 있지 않은 경우 에러 반환
      return false;
    }

    return await strategy.handle(eventExecuteDto);
  }
}
