import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { RewardRecordService } from './reward-record.service';
import { createExcelBuffer } from '../utils/excel/excel.util';
import { Response } from 'express';

@Controller('reward-record')
export class RewardRecordController {
  constructor(private readonly rewardRecordService: RewardRecordService) {}

  // 내 보상 기록 조회
  @Get()
  async findByUserEmail(@Query('userEmail') userEmail: string) {
    return await this.rewardRecordService.findByUserEmail(userEmail);
  }

  // 어드민 수락용 보상 기록 조회
  @Get('/pending')
  async findPendingByAdmin() {
    return await this.rewardRecordService.findPendingByAdmin();
  }

  // 어드민 수락용 보상 기록 excel 다운로드
  @Get('/pending/download')
  async findPendingByAdminAndDownload(@Res() res: Response) {
    const columns = [
      { header: '리워드 ID', key: '_id', width: 30 },
      { header: '이벤트 ID', key: 'eventId', width: 30 },
      { header: '이벤트 이름', key: 'eventName', width: 30 },
      { header: '사용자 이메일', key: 'userEmail', width: 30 },
      { header: '신청일', key: 'createdAt', width: 15 },
    ];
    const data = await this.rewardRecordService.findPendingByAdmin();

    const buffer = await createExcelBuffer({ columns, data });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=pending-reward-record.xlsx',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  }

  // 어드민용 보상 기록 조회
  @Get('/all/:role')
  async findAllByAuditor(@Param('role') role: string) {
    // 어드민은 모든 보상 기록 조회
    const includePending = role === 'admin' ? true : false;

    return await this.rewardRecordService.findAllUserRewardRecord(
      includePending,
    );
  }

  // 어드민, 감사자용 보상 기록 excel 다운로드
  @Get('/download/:role')
  async findAllByAuditorAndDownload(
    @Res() res: Response,
    @Param('role') role: string,
  ) {
    // 어드민은 모든 보상 기록 조회
    const includePending = role === 'admin' ? true : false;

    const columns = [
      { header: '리워드 ID', key: '_id', width: 30 },
      { header: '이벤트 ID', key: 'eventId', width: 30 },
      { header: '이벤트 이름', key: 'eventName', width: 30 },
      { header: '보상 상태', key: 'rewardStatus', width: 10 },
      { header: '보상 지급일', key: 'rewardedAt', width: 15 },
      { header: '사용자 이메일', key: 'userEmail', width: 30 },
    ];
    const data =
      await this.rewardRecordService.findAllUserRewardRecord(includePending);

    const buffer = await createExcelBuffer({ columns, data });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=reward-record.xlsx',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  }
}
