import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../utils/decorator/roles.decorator';
import { Role } from '../types/userRole.type';

@UseGuards(RolesGuard)
@Roles(Role.Admin, Role.Operator)
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

  @Patch(':eventId')
  async update(
    @Param('eventId') eventId: string,
    @Body() updateRewardDto: UpdateRewardDto,
  ) {
    return this.rewardService.update(eventId, updateRewardDto);
  }

  @Delete(':eventId')
  async delete(@Param('eventId') eventId: string) {
    await this.rewardService.delete(eventId);
    return { message: '리워드 삭제 완료' };
  }
}
