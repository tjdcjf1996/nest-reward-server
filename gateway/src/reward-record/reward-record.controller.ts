import { Controller, Get, Param, Res } from '@nestjs/common';
import { RewardRecordService } from './reward-record.service';
import { AuthToken } from '../utils/decorator/auth-token.decorator';
import { Role } from '../types/userRole.type';
import { Response } from 'express';

@Controller('reward-record')
export class RewardRecordController {
  constructor(private readonly rewardRecordService: RewardRecordService) {}

  @Get()
  async indByUserEmail(@AuthToken() token: string) {
    return this.rewardRecordService.findByUserEmail(token);
  }

  @Get('/all/:role')
  async findAllUserRewardRecord(
    @Param('role') role: Role,
    @AuthToken() token: string,
  ) {
    return this.rewardRecordService.findAllUserRewardRecord(role, token);
  }

  @Get('/download/:role')
  async downloadAllUserRewardRecord(
    @Param('role') role: Role,
    @AuthToken() token: string,
    @Res() res: Response,
  ) {
    const { data, status } =
      await this.rewardRecordService.downloadAllUserRewardRecord(role, token);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename="file.xlsx"');

    res.status(status).send(data);
  }

  @Get('/pending')
  async findPendingByAdmin(@AuthToken() token: string) {
    return this.rewardRecordService.findPendingByAdmin(token);
  }

  @Get('/pending/download')
  async downloadPendingByAdmin(
    @AuthToken() token: string,
    @Res() res: Response,
  ) {
    const { data, status } =
      await this.rewardRecordService.downloadPendingByAdmin(token);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename="file.xlsx"');

    res.status(status).send(data);
  }
}
