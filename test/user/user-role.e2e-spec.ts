import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { login } from '../util/login.util';

describe('user role (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 로그인 후 JWT 토큰 획득
    userToken = await login(app, 'test1@naver.com', '12345');
    adminToken = await login(app, 'test@naver.com', '12345');
  });

  afterAll(async () => {
    await app.close();
  });

  // 어드민일 때 권한 변경
  it('/user/role (PATCH) - 권한 변경 ', async () => {
    const dto = {
      targetEmail: 'test2@naver.com',
      targetRole: 'auditor',
    };

    const res = await request(app.getHttpServer())
      .patch('/user/role')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(dto)
      .expect(200);

    expect(res.body).toBeDefined();
  });

  // 일반 유저일 때 권한 변경
  it('/user/role (PATCH) - 권한 변경 (일반 유저)', async () => {
    const dto = {
      targetEmail: 'test2@naver.com',
      targetRole: 'auditor',
    };
    const res = await request(app.getHttpServer())
      .patch('/user/role')
      .set('Authorization', `Bearer ${userToken}`)
      .send(dto)
      .expect(403);
  });

  // 최초 서버 가동 시 어드민 권한 부여이기 때문에 테스트 당시에는 받을 수 없어야 함
  it('/user/role/admin (PATCH) - 어드민 권한 부여', async () => {
    await request(app.getHttpServer())
      .patch('/user/role/admin')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(400);
  });
});
