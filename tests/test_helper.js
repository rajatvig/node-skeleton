'use strict';

let Server = require('../src/server');

let conf = require('../src/config/config');
let appInfo = require('../package.json');

let server = Server.create(appInfo, conf);

module.exports = {
  baseUrl: 'http://' + conf.get('ip') + ':' + conf.get('port'),
  conf: conf,
  app: server,
  startServer: (done) => {
    server.start(done);
  },
  stopServer: (done) => {
    server.stop(done);
  },
  cleanDatabase: (done) => {
    done();
  }
};
