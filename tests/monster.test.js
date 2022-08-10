// const request = require('supertest');
// const app = require('../lib/app');
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
    
    const { status, body } = await agent.post('/api/v1/monsters')
      .send(newMonster);

    expect(status).toEqual(200);
    expect(body).toEqual({
      ...newMonster,
      id: expect.any(String),
      power_level: 10,
      created_at: expect.any(String),
      //need to figure out why its not grabbing user.id
      user_id: user.id
    });
  });


});
