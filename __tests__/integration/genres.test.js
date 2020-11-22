const request = require('supertest');
const { Gengre, Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('../../app'); });
  afterEach( async () => { 
    server.close();
    await Genre.remove();
  }); 

  // describe('GET /', () => {
  //   it('should return all genres', async () => {
  //     await Genre.collection.insertMany([
  //       { name: 'genre1' },
  //       { name: 'genre2' },
  //       { name: 'genre3' },
  //     ]);

  //     const res = await request(server).get('/api/genres');
  //     expect(res.status).toBe(200);
  //     expect(res.body.length).toEqual(3);
  //     expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
  //     expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
  //     expect(res.body.some(g => g.name === 'genre3')).toBeTruthy();
  //   });
  // });

  describe('GET /:id', () => {
    it('should return 404 if the genre does not exist', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(genre);
    });
  });
});