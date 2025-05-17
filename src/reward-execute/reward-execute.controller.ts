import { Body, Controller, Post } from '@nestjs/common';
import { RewardExecuteService } from './reward-execute.service';
import { RewardExecuteDto } from './dto/rewardExecute.dto';

@Controller('reward-execute')
export class RewardExecuteController {
  constructor(private readonly rewardExecuteService: RewardExecuteService) {}

  @Post()
  async executeReward(@Body() rewardExecuteDto: RewardExecuteDto) {
    return this.rewardExecuteService.executeReward(rewardExecuteDto);
  }
}
