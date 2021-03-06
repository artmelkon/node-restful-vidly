const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
  beforeEach( () => { 
    server = require('../../app'); 
    // await Genre.deleteMany(); 
  });
  afterEach( async () => { 
    server.close();
    await Genre.deleteMany();
  }); 

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
        { name: 'genre3' },
      ]);

      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toEqual(3);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre3')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return genre if valid id is pased', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
      expect(res.body).toHaveProperty('_id',  genre.id.toString());
    });

    it('should return 404 message if the id is invalid', async () => {
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with given id exiists', () => {
      const id = mongoose.Types.ObjectId().toHexString();
      const res = await request(server).get('/api/genre/' + id);
    })
  });

  describe('POST /', () => {
  
    let token, name;
    const exec = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    }
  
    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1'
    });
  
    it('should return 401 if the user not logged-in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('shoul return 400 if genre is invalid (less than 5 characters)', async () => {
      name = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters long', async () => {

      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400)
    });

    it('should record valid genre into db', async () => {
      await exec();

      const genre = await Genre.find({ name: 'genre1' });
      
      expect(genre).not.toBeNull();
    });

    it('should genre the if it is valid', async () => {
      const res = await exec();
  
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});