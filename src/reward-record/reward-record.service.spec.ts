import { Test, TestingModule } from '@nestjs/testing';
import { RewardRecordService } from './reward-record.service';

describe('RewardRecordService', () => {
  let service: RewardRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardRecordService],
    }).compile();

    service = module.get<RewardRecordService>(RewardRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
