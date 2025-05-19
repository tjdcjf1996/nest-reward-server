import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { login } from '../util/login.util';
import request from 'supertest';
import { createEvent } from '../util/create-event.util';

describe('reward (e2e)', () => {
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

    // 어드민 토큰 획득
    jwtToken = await login(app, 'test@naver.com', '12345');
    // 테스트용 이벤트 생성
    eventId = await createEvent(app, jwtToken);
  });

  afterAll(async () => {
    // 생성된 이벤트 삭제
    if (eventId) {
      await request(app.getHttpServer())
        .delete(`/event/${eventId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    }

    // 이벤트가 삭제되면 리워드도 삭제되기 때문에, 조회해볼 필요성이 있음

    const res = await request(app.getHttpServer())
      .get(`/reward/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    // 배열길이가 0이어야 함
    expect(res.body.length).toBe(0);

    await app.close();
  });

  it('/reward (POST) - 리워드 생성', async () => {
    const dto = {
      eventId,
      rewardType: 'point',
      amount: 10000,
    };
    const res = await request(app.getHttpServer())
      .post('/reward')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(dto)
      .expect(201);

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('_id');
  });

  it('/reward/:eventId (GET) - 리워드 상세 조회', async () => {
    const res = await request(app.getHttpServer())
      .get(`/reward/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body[0]).toHaveProperty('eventId', eventId);
  });

  it('/reward (GET) - 리워드 전체 조회', async () => {
    const res = await request(app.getHttpServer())
      .get('/reward')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
