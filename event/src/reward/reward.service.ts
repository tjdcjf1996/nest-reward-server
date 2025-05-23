import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { Model } from 'mongoose';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { EventService } from '../event/event.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import * as _ from 'lodash';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    private readonly eventService: EventService,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const event = await this.eventService.findById(createRewardDto.eventId);
    if (_.isNil(event) || event.deletedAt) {
      throw new BadRequestException('유효하지 않은 이벤트입니다');
    }
    return this.rewardModel.create(createRewardDto);
  }

  // 이벤트 ID에 해당한 리워드 개수 조회
  async getNumberOfRewards(eventId: string): Promise<number> {
    return await this.rewardModel
      .countDocuments({ eventId, deletedAt: null })
      .exec();
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
    if (_.isNil(updated))
      throw new NotFoundException('등록된 리워드 정보가 없습니다.');
    return updated;
  }

  async delete(eventId: string): Promise<void> {
    const deleted = await this.rewardModel.findOneAndUpdate(
      { eventId, deletedAt: null },
      {
        deletedAt: new Date(),
      },
    );
    if (_.isNil(deleted))
      throw new NotFoundException('등록된 리워드 정보가 없습니다.');
  }
  async deleteAll(eventId: string): Promise<void> {
    await this.rewardModel.updateMany(
      { eventId, deletedAt: null },
      {
        deletedAt: new Date(),
      },
    );
  }
}
