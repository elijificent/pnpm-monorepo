import request from 'supertest';
import app, { server } from '../index';

describe('GET /', () => {
  afterAll(() => {
    server.close();
  });

  it('should return a message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.body.message).toBe('Hello from the backend server!');
  });
});
