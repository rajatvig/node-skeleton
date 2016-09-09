'use strict';

const winston = require('winston');

function create(logger) {
  return (req, res) => {
    logger.debug('querying logs for', req.body);

    winston.query(req.body, (err, results) => {
      if (err) {
        res.status(500).end();
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(results).end();
      }
    });
  };
}

module.exports = {
  create: create
};
