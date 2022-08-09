const request = require('supertest');
const app = require('../lib/app');
const { setupDb, signUpUser } = require('./test-utils');

describe('/api/v1/auth', () => {
  beforeEach(setupDb);

  it('POST /monsters should add a new monster', async () => {
    const { agent, user } = await signUpUser();

    const newMonster = { 
      name: 'Medusa', 
      species: 'Gorgon', 
      type: 'cursed', 
      sub_type: 'stone' 
    };
    
    const { status, body } = await agent.post('/api/v1/monsters').send(newMonster);

    expect(status).toEqual(200);
    expect(body).toEqual({
      ...newMonster,
      id: expect.any(String),
      user_id: user.id,
    });

    const { statusCode } = await agent.get('/api/v1/users/verify');
    expect(statusCode).toBe(200);
  });


});
