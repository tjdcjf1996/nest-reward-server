import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../utils/httpClient/http-client.service';

@Injectable()
export class RewardRecordService {
  constructor(
    private readonly http: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  private get eventServerUrl() {
    return this.configService.get<string>('EVENT_SERVER');
  }

  async findByUserEmail(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };

    return await this.http.get(`${this.eventServerUrl}/reward-record`, headers);
  }

  async findAllUserRewardRecord(role: string, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };

    return await this.http.get(
      `${this.eventServerUrl}/reward-record/all/${role}`,
      headers,
    );
  }

  async downloadAllUserRewardRecord(role: string, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
      responseType: 'arraybuffer',
    };

    return await this.http.getRaw(
      `${this.eventServerUrl}/reward-record/download/${role}`,
      headers,
    );
  }

  async findPendingByAdmin(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };

    return await this.http.get(
      `${this.eventServerUrl}/reward-record/pending`,
      headers,
    );
  }

  async downloadPendingByAdmin(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };

    return await this.http.getRaw(
      `${this.eventServerUrl}/reward-record/pending/download`,
      headers,
    );
  }
}
