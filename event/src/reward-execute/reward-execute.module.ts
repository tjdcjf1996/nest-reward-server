import { Module } from '@nestjs/common';
import { RewardExecuteController } from './reward-execute.controller';
import { RewardExecuteService } from './reward-execute.service';
import { EventExecuteModule } from '../event-execute/event-execute.module';
import { RewardModule } from '../reward/reward.module';
import { RewardRecordModule } from '../reward-record/reward-record.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [EventModule, EventExecuteModule, RewardModule, RewardRecordModule],
  controllers: [RewardExecuteController],
  providers: [RewardExecuteService],
})
export class RewardExecuteModule {}
