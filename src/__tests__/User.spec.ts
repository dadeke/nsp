import request from 'supertest';
import { Connection } from 'typeorm';
import app, { connection as appConnection } from '../app';

describe('Users', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await appConnection;
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@example.com',
      name: 'User Example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a user with exists email', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@example.com',
      name: 'User Example',
    });

    expect(response.status).toBe(400);
  });
});
