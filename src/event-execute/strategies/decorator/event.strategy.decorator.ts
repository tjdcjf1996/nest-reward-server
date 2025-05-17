import { SetMetadata } from '@nestjs/common';

export const EVENT_TYPE_METADATA = 'event_metadata';

export const EventStrategy = (type: string) =>
  SetMetadata(EVENT_TYPE_METADATA, type);
