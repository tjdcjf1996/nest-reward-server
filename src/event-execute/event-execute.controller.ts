import { Body, Controller, Post } from '@nestjs/common';
import { EventExecuteService } from './event-execute.service.js';
import { EventExecuteDto } from './dto/event-execute.dto.js';

@Controller('event-execute')
export class EventExecuteController {
  constructor(private readonly eventExecuteService: EventExecuteService) {}
  @Post()
  async executeEvent(@Body() eventExecuteDto: EventExecuteDto) {
    return await this.eventExecuteService.execute(eventExecuteDto);
  }
}
