import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { AuthToken } from '../utils/decorator/auth-token.decorator';
import { RewardExecuteDto } from './dto/rewardExecute.dto';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async create(
    @Body() createRewardDto: CreateRewardDto,
    @AuthToken() token: string,
  ) {
    return this.rewardService.create(createRewardDto, token);
  }

  @Get()
  async findAll(@AuthToken() token: string) {
    return this.rewardService.findAll(token);
  }

  @Get('/all')
  async findAllIncDeleted(@AuthToken() token: string) {
    return this.rewardService.findAllIncDeleted(token);
  }

  @Get(':eventId')
  async findByEvent(
    @Param('eventId') eventId: string,
    @AuthToken() token: string,
  ) {
    return this.rewardService.findByEventId(eventId, token);
  }

  @Patch(':eventId')
  async update(
    @Param('eventId') eventId: string,
    @Body() updateRewardDto: UpdateRewardDto,
    @AuthToken() token: string,
  ) {
    return this.rewardService.update(eventId, updateRewardDto, token);
  }

  @Delete(':eventId')
  async delete(@Param('eventId') eventId: string, @AuthToken() token: string) {
    return this.rewardService.delete(eventId, token);
  }

  @Post('/execute')
  async execute(
    @Body() rewardExecuteDto: RewardExecuteDto,
    @AuthToken() token: string,
  ) {
    return await this.rewardService.execute(rewardExecuteDto, token);
  }

  @Post('/execute/pending')
  async executePending(
    @Body() rewardExecuteDto: RewardExecuteDto,
    @AuthToken() token: string,
  ) {
    return await this.rewardService.executePending(rewardExecuteDto, token);
  }
}
