'use strict';

function create(conf) {
  return (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(conf._instance).end();
  };
}

module.exports = {
  create: create
};
