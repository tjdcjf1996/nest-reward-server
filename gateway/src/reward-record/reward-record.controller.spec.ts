import { Test, TestingModule } from '@nestjs/testing';
import { RewardRecordController } from './reward-record.controller';
import { RewardRecordService } from './reward-record.service';

describe('RewardRecordController', () => {
  let controller: RewardRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRecordController],
      providers: [RewardRecordService],
    }).compile();

    controller = module.get<RewardRecordController>(RewardRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
