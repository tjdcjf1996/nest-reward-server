import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { HttpClientService } from '../utils/httpClient/http-client.service';
import { ConfigService } from '@nestjs/config';
import { EventExecuteDto } from '../event/dto/eventExecute.dto';
import { tokenToHeaders } from '../utils/util/token-to-headers.util';

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
    return this.http.post(
      `${this.eventServerUrl}/event`,
      createEventDto,
      tokenToHeaders(token),
    );
  }

  findAll(token: string | undefined) {
    return this.http.get(`${this.eventServerUrl}/event`, tokenToHeaders(token));
  }

  findAllIncDeleted(token: string | undefined) {
    return this.http.get(
      `${this.eventServerUrl}/event/all`,
      tokenToHeaders(token),
    );
  }

  findOne(id: string, token: string | undefined) {
    return this.http.get(
      `${this.eventServerUrl}/event/${id}`,
      tokenToHeaders(token),
    );
  }

  update(
    id: string,
    updateEventDto: UpdateEventDto,
    token: string | undefined,
  ) {
    return this.http.patch(
      `${this.eventServerUrl}/event/${id}`,
      updateEventDto,
      tokenToHeaders(token),
    );
  }

  delete(id: string, token: string | undefined) {
    return this.http.delete(
      `${this.eventServerUrl}/event/${id}`,
      tokenToHeaders(token),
    );
  }

  execute(eventExecuteDto: EventExecuteDto, token: string | undefined) {
    return this.http.post(
      `${this.eventServerUrl}/event-execute`,
      eventExecuteDto,
      tokenToHeaders(token),
    );
  }
}
