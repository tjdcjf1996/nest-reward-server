import { Body, Controller, Post } from '@nestjs/common';
import { EventExecuteService } from './event-execute.service';
import { EventExecuteDto } from './dto/eventExecute.dto';
import { UserInfo } from '../utils/decorator/userInfo.decorator';

@Controller('event-execute')
export class EventExecuteController {
  constructor(private readonly eventExecuteService: EventExecuteService) {}

  // dto에 따라 strategy에 맞는 이벤트를 실행
  @Post()
  async executeEvent(
    @UserInfo() user: Payload,
    @Body() eventExecuteDto: EventExecuteDto,
  ) {
    // 사용자 이메일을 dto에 추가
    eventExecuteDto.userEmail = user.email;

    return await this.eventExecuteService.execute(eventExecuteDto);
  }

  @Post('/test')
  async testEvent(@Body() eventExecuteDto: EventExecuteDto) {
    return await this.eventExecuteService.validate(eventExecuteDto);
  }
}
