import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { login } from '../util/login.util';
import request from 'supertest';
import { createEvent } from '../util/create-event.util';
import { deleteEvent } from '../util/delete-event.util';

describe('user modify (e2e)', () => {
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
    // 상세보기 테스트 할 이벤트 생성
    eventId = await createEvent(app, jwtToken);
  });

  afterAll(async () => {
    // 테스트 후 생성된 이벤트 삭제
    await deleteEvent(app, eventId, jwtToken);

    // 서버 종료
    await app.close();
  });

  // 이벤트 조회 테스트
  it('/event (GET) - 이벤트 조회', async () => {
    const res = await request(app.getHttpServer())
      .get(`/event`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
    // 정상적이라면 배열 형태로 제공
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 이벤트 상세 조회 테스트
  it('/event/:id (GET) - 이벤트 상세 조회', async () => {
    const res = await request(app.getHttpServer())
      .get(`/event/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('_id', eventId);
  });
});
