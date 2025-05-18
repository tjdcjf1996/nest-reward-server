import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HttpClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private serverKeyRefreshTime: number | null = null;
  private serverKeyRefreshInterval = 55 * 60 * 1000; // 55분
  private serverToken: string | null = null;

  private async getServerKey() {
    if (
      !this.serverKeyRefreshTime ||
      Date.now() - this.serverKeyRefreshTime > this.serverKeyRefreshInterval
    ) {
      // jwt 갱신
      this.serverToken = await this.jwtService.sign({ role: 'gateway' });
      // 시간 갱신
      this.serverKeyRefreshTime = Date.now();
      Logger.log(
        `Server key refreshed at ${new Date(this.serverKeyRefreshTime).toLocaleString()}`,
        'HttpClientService',
      );
    }

    return this.serverToken;
  }

  private async addServerKeyToHeaders(headers: Record<string, string>) {
    return {
      ...headers,
      'msa-server-token': await this.getServerKey(),
    };
  }

  async get<T = any>(url: string, headers: Record<string, string> = {}) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<T>(url, {
          headers: await this.addServerKeyToHeaders(headers),
        }),
      );
      return data;
    } catch (err: any) {
      this.handleHttpError(err);
    }
  }

  async post<T = any>(
    url: string,
    body: any,
    headers: Record<string, string> = {},
  ) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<T>(url, body, {
          headers: await this.addServerKeyToHeaders(headers),
        }),
      );
      return data;
    } catch (err: any) {
      this.handleHttpError(err);
    }
  }

  async patch<T = any>(
    url: string,
    body: any,
    headers: Record<string, string> = {},
  ) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.patch<T>(url, body, {
          headers: await this.addServerKeyToHeaders(headers),
        }),
      );
      return data;
    } catch (err: any) {
      this.handleHttpError(err);
    }
  }

  async delete<T = any>(url: string, headers: Record<string, string> = {}) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete<T>(url, {
          headers: await this.addServerKeyToHeaders(headers),
        }),
      );
      return data;
    } catch (err: any) {
      this.handleHttpError(err);
    }
  }

  private handleHttpError(err: AxiosError) {
    if (err.response && err.response.status === 500) {
      throw new HttpException('Internal Server Error', 500);
    }
    if (err.response) {
      throw new HttpException(
        err.response.data ?? 'Server Error',
        err.response.status,
      );
    }
    throw new HttpException('Unknown error', 500);
  }
}
