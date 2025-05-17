import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AttendanceStrategy } from './strategies/attendance.strategy';
import { EventExecuteService } from './event-execute.service';
import { EventModule } from '../event/event.module';
import { EventExecuteController } from './event-execute.controller';
import { EventRecordModule } from '../event-record/event-record.module';

@Module({
  imports: [DiscoveryModule, EventModule, EventRecordModule],
  providers: [EventExecuteService, AttendanceStrategy],
  controllers: [EventExecuteController],
})
export class EventExecuteModule {}
