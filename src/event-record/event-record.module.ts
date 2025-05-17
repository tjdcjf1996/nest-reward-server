import { Module } from '@nestjs/common';
import { EventRecordService } from './event-record.service';
import { EventRecordController } from './event-record.controller';
import { EventRecord, EventRecordSchema } from './schemas/eventRecord.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventRecord.name, schema: EventRecordSchema },
    ]),
  ],
  exports: [EventRecordService],
  controllers: [EventRecordController],
  providers: [EventRecordService],
})
export class EventRecordModule {}
