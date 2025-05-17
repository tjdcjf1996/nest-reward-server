import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema.js';
import { Model } from 'mongoose';
import { UpdateRewardDto } from './dto/update-reward.dto.js';
import { EventService } from 'src/event/event.service';
import { CreateRewardDto } from './dto/create-reward.dto.js';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    private readonly eventService: EventService,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const event = await this.eventService.findById(createRewardDto.eventId);
    if (!event || event.deletedAt) {
      throw new BadRequestException('유효하지 않은 이벤트입니다');
    }

    return this.rewardModel.create(createRewardDto);
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find({ deletedAt: null });
  }

  async findAllIncDeleted(): Promise<Reward[]> {
    return this.rewardModel.find();
  }

  async findByEventId(eventId: string): Promise<Reward[]> {
    return this.rewardModel
      .find({
        eventId,
        deletedAt: null,
      })
      .exec();
  }

  async update(
    eventId: string,
    updateRewardDto: UpdateRewardDto,
  ): Promise<Reward> {
    const updated = await this.rewardModel.findOneAndUpdate(
      { eventId, deletedAt: null },
      updateRewardDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException('등록된 리워드 정보가 없습니다.');
    return updated;
  }

  async delete(eventId: string): Promise<void> {
    const deleted = await this.rewardModel.findOneAndUpdate(
      { eventId, deletedAt: null },
      {
        deletedAt: new Date(),
      },
    );
    if (!deleted) throw new NotFoundException('등록된 리워드 정보가 없습니다.');
  }
}
