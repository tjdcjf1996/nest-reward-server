import { EventExecuteDto } from "src/event-execute/dto/event-execute.dto.js";

export interface EventTypeStrategy {
  handle(eventExecuteDto:EventExecuteDto): Promise<boolean>;
}
