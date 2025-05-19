import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { HttpClientService } from '../utils/httpClient/http-client.service';
import { ConfigService } from '@nestjs/config';
import { EventExecuteDto } from '../event/dto/eventExecute.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly http: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  private get eventServerUrl() {
    return this.configService.get<string>('EVENT_SERVER');
  }

  create(createEventDto: CreateEventDto, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };

    return this.http.post(
      `${this.eventServerUrl}/event`,
      createEventDto,
      headers,
    );
  }

  findAll(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.get(`${this.eventServerUrl}/event`, headers);
  }

  findAllIncDeleted(token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.get(`${this.eventServerUrl}/event/all`, headers);
  }

  findOne(id: string, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.get(`${this.eventServerUrl}/event/${id}`, headers);
  }

  update(
    id: string,
    updateEventDto: UpdateEventDto,
    token: string | undefined,
  ) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.patch(
      `${this.eventServerUrl}/event/${id}`,
      updateEventDto,
      headers,
    );
  }

  delete(id: string, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.delete(`${this.eventServerUrl}/event/${id}`, headers);
  }

  execute(eventExecuteDto: EventExecuteDto, token: string | undefined) {
    const headers = {
      Authorization: token ?? '',
    };
    return this.http.post(
      `${this.eventServerUrl}/event-execute`,
      eventExecuteDto,
      headers,
    );
  }
}
