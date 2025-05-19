import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('user create (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  const createNLoginDto = {
    email: 'testuser@naver.com',
    password: 'test1234',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    // 테스트 후 생성된 계정 삭제

    // 토큰 획득
    const res = await request(app.getHttpServer())
      .post('/user/login')
      .send(createNLoginDto)
      .expect(201);
    jwtToken = res.body.access_token;

    // 삭제 진행
    await request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    // 서버 종료
    await app.close();
  });

  it('/user/register (POST) - 회원가입', async () => {
    const res = await request(app.getHttpServer())
      .post('/user/register')
      .send(createNLoginDto)
      .expect(201);

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('message');
  });

  // 중복 아이디 요청시 409 에러 발생
  it('/user/register (POST) - 중복 회원가입', async () => {
    const res = await request(app.getHttpServer())
      .post('/user/register')
      .send(createNLoginDto)
      .expect(409);

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('message');
  });
});
