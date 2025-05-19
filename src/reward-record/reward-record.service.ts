import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../utils/httpClient/http-client.service';
import { tokenToHeaders } from '../utils/util/token-to-headers.util';

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
    return await this.http.get(
      `${this.eventServerUrl}/reward-record`,
      tokenToHeaders(token),
    );
  }

  async findAllUserRewardRecord(role: string, token: string | undefined) {
    return await this.http.get(
      `${this.eventServerUrl}/reward-record/all/${role}`,
      tokenToHeaders(token),
    );
  }

  async downloadAllUserRewardRecord(role: string, token: string | undefined) {
    return await this.http.getRaw(
      `${this.eventServerUrl}/reward-record/download/${role}`,
      tokenToHeaders(token, { responseType: 'arraybuffer' }),
    );
  }

  async findPendingByAdmin(token: string | undefined) {
    return await this.http.get(
      `${this.eventServerUrl}/reward-record/pending`,
      tokenToHeaders(token),
    );
  }

  async downloadPendingByAdmin(token: string | undefined) {
    return await this.http.getRaw(
      `${this.eventServerUrl}/reward-record/pending/download`,
      tokenToHeaders(token, { responseType: 'arraybuffer' }),
    );
  }
}
