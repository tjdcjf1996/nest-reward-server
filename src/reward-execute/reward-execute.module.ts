import { Module } from '@nestjs/common';
import { RewardExecuteController } from './reward-execute.controller';
import { RewardExecuteService } from './reward-execute.service';
import { EventModule } from '../event/event.module';
import { EventExecuteModule } from '../event-execute/event-execute.module';
import { RewardModule } from '../reward/reward.module';

@Module({
  imports: [EventModule, EventExecuteModule, RewardModule],
  controllers: [RewardExecuteController],
  providers: [RewardExecuteService],
})
export class RewardExecuteModule {}
