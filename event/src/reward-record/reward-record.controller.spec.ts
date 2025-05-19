import { Test, TestingModule } from '@nestjs/testing';
import { RewardRecordController } from './reward-record.controller';

describe('RewardRecordController', () => {
  let controller: RewardRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRecordController],
    }).compile();

    controller = module.get<RewardRecordController>(RewardRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
