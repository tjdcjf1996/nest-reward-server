import { Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { HttpClientService } from '../utils/httpClient/http-client.service';
import { ConfigService } from '@nestjs/config';
import { tokenToHeaders } from '../utils/util/token-to-headers.util';

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
    return this.http.post(
      `${this.eventServerUrl}/reward`,
      createRewardDto,
      tokenToHeaders(token),
    );
  }

  async findAll(token: string | undefined) {
    return this.http.get(
      `${this.eventServerUrl}/reward`,
      tokenToHeaders(token),
    );
  }

  async findAllIncDeleted(token: string | undefined) {
    return this.http.get(
      `${this.eventServerUrl}/reward/all`,
      tokenToHeaders(token),
    );
  }

  async findByEventId(eventId: string, token: string | undefined) {
    return this.http.get(
      `${this.eventServerUrl}/reward/${eventId}`,
      tokenToHeaders(token),
    );
  }

  async update(
    eventId: string,
    updateRewardDto: UpdateRewardDto,
    token: string | undefined,
  ) {
    return this.http.patch(
      `${this.eventServerUrl}/reward/${eventId}`,
      updateRewardDto,
      tokenToHeaders(token),
    );
  }

  async delete(eventId: string, token: string | undefined) {
    return this.http.delete(
      `${this.eventServerUrl}/reward/${eventId}`,
      tokenToHeaders(token),
    );
  }
}
