import { Test, TestingModule } from '@nestjs/testing';
import { EventRecordController } from './event-record.controller';
import { EventRecordService } from './event-record.service';

describe('EventRecordController', () => {
  let controller: EventRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRecordController],
      providers: [EventRecordService],
    }).compile();

    controller = module.get<EventRecordController>(EventRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
