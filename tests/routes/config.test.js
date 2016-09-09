'use strict';

describe('config route', () => {
  const request = require('supertest');
  const expect = require('chai').expect;

  const testApp = require('../test_helper');

  before((done) => {
    testApp.startServer(done);
  });

  after((done) => {
    testApp.stopServer(done);
  });

  it('should return configuration of the application', (done) => {
    request(testApp.baseUrl)
      .get('/config')
      .end((e, res) => {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.env).to.eql('test');
        expect(res.body.port).to.eql(3000);
        done();
      });
  });
});
