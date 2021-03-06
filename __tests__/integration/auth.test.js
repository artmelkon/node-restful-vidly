const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const request = require('supertest');

let server;

describe('auth middleware', () => {
  beforeEach(() => { server = require('../../app'); token = new User().generateAuthToken(); });
  afterEach( async () => { 
    server.close();
    await Genre.deleteMany({});
  });

  let token;
  const exec = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1'});
  }


  it('should return 401 if no toke provided', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('shoult return 400 if the token ins invalid', async () => {
    token = 'a';
    
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if the tokin is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});