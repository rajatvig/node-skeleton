'use strict';

describe('reqid', () => {
  const request= require('supertest');
  const expect = require('chai').expect;
  const testApp = require('../test_helper');

  before((done) => {
    testApp.startServer(done);
  });

  after((done) => {
    testApp.stopServer(done);
  });

  it('should set request ID', (done) => {
    request(testApp.baseUrl)
      .get('/')
      .end((e, res) => {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.headers['x-request-id']).to.not.be.undefined;
        done();
      });
  });

  it('should not set request ID if present', (done) => {
    let expected = 'some-id';
    request(testApp.baseUrl)
      .get('/')
      .set('X-Request-Id', expected)
      .end((e, res) => {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.headers['x-request-id']).to.eql(expected);
        done();
      });
  });
});
