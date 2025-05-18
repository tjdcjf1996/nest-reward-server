import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventExecuteDto } from '../event/dto/eventExecute.dto';
import { AuthToken } from '../utils/decorator/auth-token.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @AuthToken() token: string) {
    return this.eventService.create(createEventDto, token);
  }

  @Get()
  findAll(@AuthToken() token: string) {
    return this.eventService.findAll(token);
  }

  @Get('/all')
  findAllIncDeleted(@AuthToken() token: string) {
    return this.eventService.findAllIncDeleted(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthToken() token: string) {
    return this.eventService.findOne(id, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @AuthToken() token: string,
  ) {
    return this.eventService.update(id, updateEventDto, token);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @AuthToken() token: string) {
    return await this.eventService.delete(id, token);
  }

  @Post('/execute')
  async execute(
    @Body() eventExecuteDto: EventExecuteDto,
    @AuthToken() token: string,
  ) {
    return await this.eventService.execute(eventExecuteDto, token);
  }
}
