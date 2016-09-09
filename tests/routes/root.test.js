'use strict';

describe('root route', () => {
  const request= require('supertest');
  const expect = require('chai').expect;
  const testApp = require('../test_helper');

  before((done) => {
    testApp.startServer(done);
  });

  after((done) => {
    testApp.stopServer(done);
  });

  it('responds with json for / with links', (done) => {
    request(testApp.baseUrl)
      .get('/')
      .end((e, res) => {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body._links.self.href).to.eql('/');
        expect(res.body._links.config.href).to.eql('/config');
        done();
      });
  });

});
