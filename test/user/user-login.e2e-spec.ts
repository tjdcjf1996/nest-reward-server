import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('user login (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user/login (POST) - 로그인', async () => {
    const dto = {
      email: 'test1@naver.com',
      password: '12345',
    };
    const res = await request(app.getHttpServer())
      .post('/user/login')
      .send(dto)
      .expect(201);

    expect(res.body).toHaveProperty('access_token');
    expect(res.body.access_token).toBeDefined();
  });
});
