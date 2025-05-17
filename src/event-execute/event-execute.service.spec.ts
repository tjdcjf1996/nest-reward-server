import { Test, TestingModule } from '@nestjs/testing';
import { EventExecuteService } from './event-execute.service';

describe('EventExecuteService', () => {
  let service: EventExecuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventExecuteService],
    }).compile();

    service = module.get<EventExecuteService>(EventExecuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
