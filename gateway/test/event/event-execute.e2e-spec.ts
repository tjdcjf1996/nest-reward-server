import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { login } from '../util/login.util';
import { createEvent } from '../util/create-event.util';
import { deleteEvent } from '../util/delete-event.util';

describe('user execute (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  let eventId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 어드민 토큰 획득
    adminToken = await login(app, 'test@naver.com', '12345');
    // 일반 유저 토큰 획득
    userToken = await login(app, 'test1@naver.com', '12345');

    // 참여 테스트 할 이벤트 생성
    eventId = await createEvent(app, adminToken);
  });

  afterAll(async () => {
    // 테스트 후 생성된 이벤트 삭제
    await deleteEvent(app, eventId, adminToken);

    // 서버 종료
    await app.close();
  });

  // 이벤트 참여 테스트
  it('/event/execute (POST) - 이벤트 참여', async () => {
    const res = await request(app.getHttpServer())
      .post(`/event/execute`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ eventId })
      .expect(201);

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('message');
  });
});
