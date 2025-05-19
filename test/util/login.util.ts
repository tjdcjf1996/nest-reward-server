import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function login(
  app: INestApplication,
  email: string,
  password: string,
) {
  const res = await request(app.getHttpServer())
    .post('/user/login')
    .send({ email, password });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('access_token');
  expect(res.body.access_token).toBeDefined();
  return res.body.access_token;
}
