import { Body, Controller, Post } from '@nestjs/common';
import { RewardExecuteService } from './reward-execute.service';
import { RewardExecuteDto } from './dto/rewardExecute.dto';
import { UserInfo } from '../utils/decorator/userInfo.decorator';

@Controller('reward-execute')
export class RewardExecuteController {
  constructor(private readonly rewardExecuteService: RewardExecuteService) {}

  @Post()
  async executeReward(
    @UserInfo() user: Payload,
    @Body() rewardExecuteDto: RewardExecuteDto,
  ) {
    // 사용자 이메일을 dto에 추가
    rewardExecuteDto.userEmail = user.email;

    return this.rewardExecuteService.executeReward(rewardExecuteDto);
  }

  @Post('/pending')
  async executePendingReward(@Body() rewardExecuteDto: RewardExecuteDto) {
    return this.rewardExecuteService.executePendingReward(rewardExecuteDto);
  }
}
