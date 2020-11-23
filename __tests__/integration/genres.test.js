const request = require('supertest');
const { Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
  beforeEach(async () => { server = require('../../app'); await Genre.deleteMany(); });
  afterEach( () => { 
    server.close();
    // await Genre.deleteMany();
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
  });

  describe('POST /', () => {
    it('should return 401 if the user not logged-in', async () => {
      const res = await request(server).post('/api/genres').send({ name: 'genre1' });

      expect(res.status).toBe(401);
    });
  });
});