import { Test, TestingModule } from '@nestjs/testing';
import { EventExecuteController } from './event-execute.controller';

describe('EventExecuteController', () => {
  let controller: EventExecuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventExecuteController],
    }).compile();

    controller = module.get<EventExecuteController>(EventExecuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
