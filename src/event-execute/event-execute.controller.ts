import { Body, Controller, Post } from '@nestjs/common';

@Controller('event-execute')
export class EventExecuteController {
  constructor(private readonly eventExecuteService: EventExecuteService) {}
  @Post()
  async executeEvent(@Body() eventExecuteDto: EventExecuteDto) {
    return await this.eventExecuteService.execute(eventExecuteDto);
  }
}
