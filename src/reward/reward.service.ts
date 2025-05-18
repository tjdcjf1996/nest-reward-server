import { Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { HttpClientService } from '../utils/httpClient/http-client.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RewardService {
  constructor(
    private readonly http: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  private get eventServerUrl() {
    return this.configService.get<string>('EVENT_SERVER');
  }

  async create(createRewardDto: CreateRewardDto, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.post(
      `${this.eventServerUrl}/reward`,
      createRewardDto,
      headers,
    );
  }

  async findAll(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.get(`${this.eventServerUrl}/reward`, headers);
  }

  async findAllIncDeleted(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.get(`${this.eventServerUrl}/reward/all`, headers);
  }

  async findByEventId(eventId: string, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.get(`${this.eventServerUrl}/reward/${eventId}`, headers);
  }

  async update(
    eventId: string,
    updateRewardDto: UpdateRewardDto,
    token: string | undefined,
  ) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.patch(
      `${this.eventServerUrl}/reward/${eventId}`,
      updateRewardDto,
      headers,
    );
  }

  async delete(eventId: string, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.delete(
      `${this.eventServerUrl}/reward/${eventId}`,
      headers,
    );
  }
}
