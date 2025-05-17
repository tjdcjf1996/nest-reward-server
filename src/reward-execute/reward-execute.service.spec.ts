import { Test, TestingModule } from '@nestjs/testing';
import { RewardExecuteService } from './reward-execute.service';

describe('RewardExecuteService', () => {
  let service: RewardExecuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardExecuteService],
    }).compile();

    service = module.get<RewardExecuteService>(RewardExecuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
