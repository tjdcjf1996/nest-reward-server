import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RewardExecuteService } from './reward-execute.service';
import { RewardExecuteDto } from './dto/rewardExecute.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../utils/decorator/roles.decorator';
import { Role } from '../types/userRole.type';
import { Payload } from '../auth/payload.class';
import { UserInfo } from '../utils/decorator/userInfo.decorator';

@UseGuards(RolesGuard)
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

  @Roles(Role.Admin, Role.Operator)
  @Post('/pending')
  async executePendingReward(@Body() rewardExecuteDto: RewardExecuteDto) {
    return this.rewardExecuteService.executePendingReward(rewardExecuteDto);
  }
}
