import request from 'supertest';
import { Connection } from 'typeorm';
import app, { connection as appConnection } from '../app';

describe('Surveys', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await appConnection;
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Title Example2',
      description: 'Description Example2',
    });

    const response = await request(app).get('/surveys');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
