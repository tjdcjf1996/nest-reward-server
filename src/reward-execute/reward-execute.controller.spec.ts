import { Test, TestingModule } from '@nestjs/testing';
import { RewardExecuteController } from './reward-execute.controller';

describe('RewardExecuteController', () => {
  let controller: RewardExecuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardExecuteController],
    }).compile();

    controller = module.get<RewardExecuteController>(RewardExecuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
