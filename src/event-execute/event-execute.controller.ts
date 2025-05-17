import { Body, Controller, Post } from '@nestjs/common';
import { EventExecuteService } from './event-execute.service';
import { EventExecuteDto } from './dto/eventExecute.dto';

@Controller('event-execute')
export class EventExecuteController {
  constructor(private readonly eventExecuteService: EventExecuteService) {}
  @Post()
  async executeEvent(@Body() eventExecuteDto: EventExecuteDto) {
    return await this.eventExecuteService.execute(eventExecuteDto);
  }

  @Post('/test')
  async testEvent(@Body() eventExecuteDto: EventExecuteDto) {
    return await this.eventExecuteService.validate(eventExecuteDto);
  }
}
