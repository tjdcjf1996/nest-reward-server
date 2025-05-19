import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function deleteEvent(
  app: INestApplication,
  eventId: string,
  jwtToken: string,
) {
  await request(app.getHttpServer())
    .delete(`/event/${eventId}`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(200);
}
