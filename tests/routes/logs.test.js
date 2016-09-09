'use strict';

describe('logs route', () => {
  const request = require('supertest');
  const expect = require('chai').expect;

  const testApp = require('../test_helper');

  before((done) => {
    testApp.startServer(done);
  });

  after((done) => {
    testApp.stopServer(done);
  });

  it('should return log entries', (done) => {
    let options = {
      from: new Date - 24 * 60 * 60 * 1000,
      until: new Date,
      limit: 1,
      start: 0,
      order: 'desc',
      fields: ['message', 'timestamp']
    };

    request(testApp.baseUrl)
      .post('/logs')
      .send(options)
      .end((e, res) => {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
