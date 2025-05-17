import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service.js';
import { CreateEventDto } from './dto/createEvent.dto.js';
import { UpdateEventDto } from './dto/updateEvent.dto.js';
import { ModuleRef } from '@nestjs/core';
import { RewardService } from 'src/reward/reward.service';

@Controller('event')
export class EventController implements OnModuleInit {
  private rewardService: RewardService;
  constructor(
    private readonly eventService: EventService,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.rewardService = this.moduleRef.get(RewardService, { strict: false });

    if (!this.rewardService) {
      throw new Error('RewardService not found');
    }
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @Get('/all')
  findAllIncDeleted() {
    return this.eventService.findAllIncDeleted();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // 이벤트 삭제
    await this.eventService.delete(id);

    // 해당 이벤트에 속한 리워드 확인
    const rewards = await this.rewardService.getNumberOfEvents(id);
    if (rewards > 0) {
      await this.rewardService.deleteAll(id);
    }

    return { message: '삭제되었습니다.' };
  }
}
