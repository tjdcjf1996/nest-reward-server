import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { randomUUID } from 'crypto';
import request from 'supertest';
import { login } from '../util/login.util';

describe('event create (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let eventId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 로그인 후 JWT 토큰 획득
    jwtToken = await login(app, 'test@naver.com', '12345');
  });

  afterAll(async () => {
    // 테스트 후 생성된 이벤트 삭제
    const res = await request(app.getHttpServer())
      .delete(`/event/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    // 서버 종료
    await app.close();
  });

  it('/event/create (POST) - 이벤트 생성', async () => {
    const dto = {
      title: 'Test Event' + randomUUID(),
      description: 'This is a test event.',
      startAt: new Date(),
      endAt: new Date(new Date().getTime() + 86400000), // 1일 후
      status: 'active',
      type: 'attendance',
      contents: {
        days: 1,
      },
      autoExecute: true,
    };

    const res = await request(app.getHttpServer())
      .post('/event')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(dto)
      .expect(201);

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('_id');
    eventId = res.body._id;
  });
});
