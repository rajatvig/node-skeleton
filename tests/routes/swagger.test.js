'use strict';

describe('swagger route', () => {
  const request = require('supertest');
  const expect = require('chai').expect;

  const testApp = require('../test_helper');

  before((done) => {
    testApp.startServer(done);
  });

  after((done) => {
    testApp.stopServer(done);
  });

  it('should return api-docs', (done) => {
    request(testApp.baseUrl)
      .get('/api-docs.json')
      .end((e, res) => {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.info.title).to.eql('node-skeleton');
        expect(res.body.swagger).to.eql('2.0');
        done();
      });
  });
});
