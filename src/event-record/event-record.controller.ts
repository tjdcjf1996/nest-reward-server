import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventRecordService } from './event-record.service';
import { CreateEventRecordDto } from './dto/create-event-record.dto';

@Controller('event-record')
export class EventRecordController {
  constructor(private readonly eventRecordService: EventRecordService) {}

  @Post()
  create(@Body() createEventRecordDto: CreateEventRecordDto) {
    return this.eventRecordService.create(createEventRecordDto);
  }

  @Get()
  findAll() {
    return this.eventRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRecordService.findOne(+id);
  }
}
