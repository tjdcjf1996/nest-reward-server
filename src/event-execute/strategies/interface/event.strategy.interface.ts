import { EventExecuteDto } from '../../dto/eventExecute.dto';

export interface EventTypeStrategy {
  handle(eventExecuteDto: EventExecuteDto): Promise<boolean>;
}
