import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RewardService } from './reward.service.js';
import { CreateRewardDto } from './dto/create-reward.dto.js';
import { UpdateRewardDto } from './dto/update-reward.dto.js';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.create(createRewardDto);
  }

  @Get()
  async findAll() {
    return this.rewardService.findAll();
  }

  @Get('/all')
  async findAllIncDeleted() {
    return this.rewardService.findAllIncDeleted();
  }

  @Get(':eventId')
  async findByEvent(@Param('eventId') eventId: string) {
    return this.rewardService.findByEventId(eventId);
  }

  @Put(':eventId')
  async update(
    @Param('eventId') eventId: string,
    @Body() updateRewardDto: UpdateRewardDto,
  ) {
    return this.rewardService.update(eventId, updateRewardDto);
  }

  @Delete(':eventId')
  async delete(@Param('eventId') eventId: string) {
    return this.rewardService.delete(eventId);
  }
}
