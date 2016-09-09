'use strict';

function create() {
  return (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({
      '_links': {
        'self': {
          'href': '/'
        },
        'config': {
          href: '/config'
        },
        'logs': {
          href: '/logs'
        },
        'docs': {
          href: '/api-docs.json'
        }
      }
    });
  };
}

module.exports = {
  create: create
};
