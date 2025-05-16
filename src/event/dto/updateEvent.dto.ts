import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './createEvent.dto.js';

export class UpdateEventDto extends PartialType(CreateEventDto) {}
