import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';
import request from 'supertest';

const createEventDto = {
  title: 'event test' + randomUUID(),
  description: 'click test',
  startAt: new Date(),
  endAt: new Date(new Date().getTime() + 86400000), // 1일 후
  status: 'active',
  type: 'click',
  autoExecute: true,
};

export async function createEvent(app: INestApplication, token: string) {
  const res = await request(app.getHttpServer())
    .post('/event')
    .set('Authorization', `Bearer ${token}`)
    .send(createEventDto)
    .expect(201);

  expect(res.body).toBeDefined();
  expect(res.body).toHaveProperty('_id');
  return res.body._id;
}
