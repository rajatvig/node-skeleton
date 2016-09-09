'use strict';

const uuid = require('node-uuid');

function create() {
  return (req, res, next) => {
    req.id = reqId(req);
    res.setHeader('X-Request-Id', req.id);
    next();
  };

  function reqId(req) {
    return req.headers['x-request-id']
      || uuid.v4();
  }
}

module.exports = {
  create: create
};
