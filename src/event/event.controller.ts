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
import { Request } from 'express';
import { EventExecuteDto } from '../event/dto/eventExecute.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return this.eventService.create(createEventDto, token);
  }

  @Get()
  findAll(@Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return this.eventService.findAll(token);
  }

  @Get('/all')
  findAllIncDeleted(@Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return this.eventService.findAllIncDeleted(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return this.eventService.findOne(id, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return this.eventService.update(id, updateEventDto, token);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return await this.eventService.delete(id, token);
  }

  @Post('/execute')
  async execute(@Body() eventExecuteDto: EventExecuteDto, @Req() req: Request) {
    const token = req.headers.authorization;
    // jwt 토큰이 없으면 실행되지 않기 때문에 undefined일 수 없음
    return await this.eventService.execute(eventExecuteDto, token);
  }
}
