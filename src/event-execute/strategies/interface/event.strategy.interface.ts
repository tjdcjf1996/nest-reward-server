import { EventExecuteDto } from '../../dto/eventExecute.dto';

/**
 * @description 이벤트 전략 인터페이스
 * @property {function} handle - 이벤트 실행 핸들러
 * @property {function} validate - 보상 지급 유효 검사 핸들러
 */
export interface EventTypeStrategy {
  handle(eventExecuteDto: EventExecuteDto): Promise<any>;
  validate(
    eventExecuteDto: EventExecuteDto,
    contents: Record<string, any>,
  ): Promise<boolean>;
}
