import { Injectable } from '@nestjs/common';
import { CreateEventRecordDto } from './dto/create-event-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventRecord, EventRecordDocument } from './schemas/eventRecord.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventRecordService {
  constructor(
    @InjectModel(EventRecord.name)
    private eventRecordModel: Model<EventRecordDocument>,
  ) {}
  async create(createEventRecordDto: CreateEventRecordDto) {
    const eventRecord = new this.eventRecordModel(createEventRecordDto);
    return await eventRecord.save();
  }

  // 조건에 맞는 이벤트 레코드 조회
  async findByCondition(condition: Record<string, any>) {
    return this.eventRecordModel.find(condition);
  }

  // 조건에 맞는 이벤트 레코드 개수 조회
  async countByCondition(condition: Record<string, any>) {
    return this.eventRecordModel.countDocuments(condition);
  }

  findAll() {
    return `This action returns all eventRecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventRecord`;
  }
}
