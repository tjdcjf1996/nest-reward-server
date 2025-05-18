import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RewardRecordService } from './reward-record.service';
import { createExcelBuffer } from '../utils/excel/excel.util';
import { Response } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../utils/decorator/roles.decorator';
import { Role } from '../types/userRole.type';
import { UserInfo } from '../utils/decorator/userInfo.decorator';
import { Payload } from '../auth/payload.class';

@UseGuards(RolesGuard)
@Roles(Role.Admin, Role.Operator)
@Controller('reward-record')
export class RewardRecordController {
  constructor(private readonly rewardRecordService: RewardRecordService) {}

  // 권한 체크 공통 함수
  private checkAuditorAdminConflict(user: Payload, role: string) {
    if (user.role === Role.Auditor && role === 'admin') {
      throw new ForbiddenException('권한이 없습니다.');
    }
  }

  // 엑셀 다운로드 공통 함수
  private async downloadExcel(
    res: Response,
    columns: any[],
    data: any[],
    filename: string,
  ) {
    const buffer = await createExcelBuffer({ columns, data });
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  }

  // 내 보상 기록 조회
  @Roles(Role.User, Role.Admin, Role.Operator)
  @Get()
  async findByUserEmail(@UserInfo() user: Payload) {
    const userEmail = user.email;
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
    await this.downloadExcel(res, columns, data, 'pending-reward-record.xlsx');
  }

  // 어드민,감사자용 보상 기록 조회
  @Roles(Role.Admin, Role.Operator, Role.Auditor)
  @Get('/all/:role')
  async findAllByAuditor(
    @Param('role') role: string,
    @UserInfo() user: Payload,
  ) {
    this.checkAuditorAdminConflict(user, role);
    const includePending = role === 'admin';
    return await this.rewardRecordService.findAllUserRewardRecord(
      includePending,
    );
  }

  // 어드민, 감사자용 보상 기록 excel 다운로드
  @Roles(Role.Admin, Role.Operator, Role.Auditor)
  @Get('/download/:role')
  async findAllByAuditorAndDownload(
    @Res() res: Response,
    @Param('role') role: string,
    @UserInfo() user: Payload,
  ) {
    this.checkAuditorAdminConflict(user, role);
    const includePending = role === 'admin';
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
    await this.downloadExcel(res, columns, data, 'reward-record.xlsx');
  }
}
