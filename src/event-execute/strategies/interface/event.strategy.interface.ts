import { EventExecuteDto } from '../../dto/eventExecute.dto';

export interface EventTypeStrategy {
  handle(eventExecuteDto: EventExecuteDto): Promise<any>;
  validate(
    eventExecuteDto: EventExecuteDto,
    contents: Record<string, any>,
  ): Promise<boolean>;
}
