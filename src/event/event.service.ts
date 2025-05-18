import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = new this.eventModel(createEventDto);
    return await event.save();
  }

  // 이벤트 ID로 리워드 자동지급 여부 확인
  async isAutoExecute(eventId: string): Promise<boolean> {
    const event = await this.findById(eventId);
    if (!event) throw new NotFoundException('이벤트를 찾을 수 없습니다.');

    return event.autoExecute;
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find({ deletedAt: null }).exec();
  }

  async findAllIncDeleted(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventModel
      .findById({ _id: id, deleteAt: null })
      .exec();
    if (!event) throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updated = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.eventModel
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        { deletedAt: new Date() },
        { new: true },
      )
      .exec();

    if (!result)
      throw new BadRequestException(
        '이미 삭제되었거나 존재하지 않는 이벤트입니다.',
      );
  }
}
