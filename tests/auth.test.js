const request = require('supertest');
const app = require('../lib/app');
const { setupDb, signUpUser } = require('./test-utils');

describe('/api/v1/auth', () => {
  beforeEach(setupDb);

  it('/signup should create a new user and give them a cookie', async () => {
    const { agent, user, credentials } = await signUpUser();

    expect(user).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });

    const { statusCode } = await agent.get('/api/v1/users/verify');
    expect(statusCode).toBe(200);
  });

  it('/signup should prevent exact same emails from being used', async () => {
    await signUpUser();
    const { res } = await signUpUser();
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      status: 400,
      message: 'Please be more creative this email already exists'
    }); 
  });

  it('/signin should login a already created user and give them a cookie', async () => {
    const { credentials } = await signUpUser();

    const agent = request.agent(app);
    const res = await agent.post('/api/v1/users/signin').send(credentials);

    expect(res.body).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });

    const { statusCode } = await agent.get('/api/v1/users/verify');
    expect(statusCode).toBe(200);
  });

  it('/signout should remove a user session', async () => {
    const { agent } = await signUpUser();

    const { body } = await agent.delete('/api/v1/users/signout');
    expect(body).toEqual(null);

    const { statusCode } = await agent.get('/api/v1/users/verify');
    expect(statusCode).toBe(401);
  });

});
