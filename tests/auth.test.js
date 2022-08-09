// const request = require('supertest');
// const app = require('../lib/app');
const { setupDb, signUpUser } = require('./test-utils');

describe('/api/v1/auth', () => {
  beforeEach(setupDb);

  it('/signup should create a new user and give them a cookie', async () => {
    const { agent, user, credentials } = await signUpUser();

    expect(user).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    expect(statusCode).toBe(200);
  });

    
});
