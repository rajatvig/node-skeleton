'use strict';

const conf = require('./config/config');
const appInfo = require('../package.json');

const Server = require('./server');

let server = Server.create(appInfo, conf);

server.start(() => {});

process.on('SIGTERM', function () {
  server.stop();
});
