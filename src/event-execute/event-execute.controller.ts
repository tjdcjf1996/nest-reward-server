import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventExecuteService } from './event-execute.service';
import { EventExecuteDto } from './dto/eventExecute.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../utils/decorator/roles.decorator';
import { Role } from '../types/userRole.type';
import { UserInfo } from '../utils/decorator/userInfo.decorator';
import { Payload } from '../auth/payload.class';

@UseGuards(RolesGuard)
@Controller('event-execute')
export class EventExecuteController {
  constructor(private readonly eventExecuteService: EventExecuteService) {}

  // dto에 따라 strategy에 맞는 이벤트를 실행
  @Roles(Role.User, Role.Admin, Role.Operator)
  @Post()
  async executeEvent(
    @UserInfo() user: Payload,
    @Body() eventExecuteDto: EventExecuteDto,
  ) {
    // 사용자 이메일을 dto에 추가
    eventExecuteDto.userEmail = user.email;

    return await this.eventExecuteService.execute(eventExecuteDto);
  }

  @Roles(Role.Admin, Role.Operator)
  @Post('/test')
  async testEvent(@Body() eventExecuteDto: EventExecuteDto) {
    return await this.eventExecuteService.validate(eventExecuteDto);
  }
}
