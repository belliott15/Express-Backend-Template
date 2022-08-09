const pool = require('../lib/utils/pool');
const { readFileSync } = require('node:fs');
const sql = readFileSync('./sql/setup.sql', 'utf-8');
const request = require('supertest');
const app = require('../lib/app');

function setupDb(){
  return pool.query(sql);
}

function closeAll(){
  return pool.end();
}

afterAll(closeAll);

const mockUser = {
  email: 'BillyButcherson@HocusPocus.com',
  password: 'holdontoyourhead',
};

async function signUpUser(credentials = mockUser){
  const agent = request.agent(app);
  const res = await agent.post('/api/v1/users/signup').send(credentials);
  return { agent, user: res.body, res, credentials };
}

module.exports = { signUpUser, setupDb };
