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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { ModuleRef } from '@nestjs/core';
import { RewardService } from 'src/reward/reward.service';

@Controller('event')
export class EventController implements OnModuleInit {
  private rewardService: RewardService;
  constructor(
    private readonly eventService: EventService,
    private moduleRef: ModuleRef,
  ) {}

  // 순환 참조 방지를 위해 ModuleRef를 사용하여 RewardService 불러옴
  onModuleInit() {
    this.rewardService = this.moduleRef.get(RewardService, { strict: false });

    if (!this.rewardService) {
      throw new Error('리워드 서비스를 찾을 수 없습니다.');
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

  /* 
    이벤트를 삭제할 때 해당 이벤트에 속한 리워드도 함께 삭제
    리워드가 존재하는 경우에만 삭제 
  */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.eventService.delete(id);

    const rewards = await this.rewardService.getNumberOfRewards(id);
    if (rewards > 0) {
      await this.rewardService.deleteAll(id);
    }

    return { message: '삭제되었습니다.' };
  }
}
