const request = require('supertest');
const { mongoose } = require('../database/index.js');
const { app } = require('./app.js');

afterAll(() => {
  mongoose.connection.close();
});

describe('GET success response', () => {
  it('respond with 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
