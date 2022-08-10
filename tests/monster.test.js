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

  it('GET / should get all user monsters', async () => {
    const { agent } = await signUpUser();

    const { body: user1Monster } = await agent.post('/api/v1/monsters').send({ 
      name: 'Medusa', 
      species: 'Gorgon', 
      type: 'cursed', 
      sub_type: 'stone' 
    });

    const { agent: agent2 } = await signUpUser({
      email: 'secondUser@email.com', 
      password: 'password',
    });

    const { body: user2Monster } = await agent2.post('/api/v1/monsters').send({
      name: 'Ariel', 
      species: 'Siren', 
      type: 'Psychic', 
      sub_type: 'water' 
    });

    const res1 = await agent.get('/api/v1/monsters');
    expect(res1.status).toEqual(200);
    expect(res1.body).toEqual([user1Monster]);

    const res2 = await agent2.get('/api/v1/monsters');
    expect(res2.status).toEqual(200);
    expect(res2.body).toEqual([user2Monster]);

  });

  it('GET /:id should return a specific monster', async () => {
    const { agent } = await signUpUser();

    const { body: monster } = await agent.post('/api/v1/monsters').send({
      name: 'Medusa', 
      species: 'Gorgon', 
      type: 'cursed', 
      sub_type: 'stone'
    });

    
    const { status, body: got } = await agent.get(`/api/v1/monsters/${monster.id}`);
    

    expect(status).toBe(200);
    expect(got).toEqual(monster);
  });

  it('GET / should prevent unauthenticated user from accessing monsters', async () => {
    const { status } = await request(app).get('/api/v1/monsters');
    expect(status).toEqual(401);
  });

  it('UPDATE /:id should update a monster', async () => {
    const { agent } = await signUpUser();

    const { body: monster } = await agent.post('/api/v1/monsters').send({ 
      name: 'Medusa', 
      species: 'Gorgon', 
      type: 'cursed', 
      sub_type: 'stone' 
    });

    const { status, body: updated } = await agent.put(`/api/v1/monsters/${monster.id}`)
      .send({ power_level: 20 });

    expect(status).toBe(200);
    expect(updated).toEqual({ ...monster, power_level: 20 });
  });

  it('DELETE /:id should delete items for authorized user', async () => {
    const { agent } = await signUpUser();

    const { body: monster } = await agent.post('/api/v1/monsters').send({ 
      name: 'Medusa', 
      species: 'Gorgon', 
      type: 'cursed', 
      sub_type: 'stone' 
    });

    const { status, body } = await agent.delete(`/api/v1/monsters/${monster.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(monster);

    const { body: monster1 } = await agent.get('/api/v1/monsters');

    expect(monster1.length).toBe(0);
  });

});
