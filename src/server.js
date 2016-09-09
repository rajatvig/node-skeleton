'use strict';

const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');

const conf = require('./config/config');

const Logger = require('./logger/logger');

const ReqIdMiddleware = require('./middleware/reqid');

const RootHandler = require('./routes/root');
const LogsHandler = require('./routes/logs');
const DocsHandler = require('./routes/swagger');
const ConfigHandler = require('./routes/config');

function create(appInfo, appConf) {
  let logger = Logger.create(appInfo, conf);

  let app = express();

  var reqLogOptions = {
    winstonInstance: logger,
    msg: '{{req.protocol}} {{req.method}} {{req.url}} {{req.id}} {{res.statusCode}} {{res.responseTime}}ms {{req.ip}} {{req.hostname}}',
    meta: conf.get('log.logMeta')
  };

  app.use(expressWinston.logger(reqLogOptions));
  app.use(expressWinston.errorLogger(reqLogOptions));

  app.use(bodyParser.json());
  app.use(cors());
  app.use(errorHandler());

  app.use(ReqIdMiddleware.create());

  app.set('etag', true);
  app.set('index', true);
  app.set('json spaces', 2);

  /**
   * @swagger
   * /:
   *   get:
   *     description: Get the Routes supported on the Application
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: the routes supported
   */
  app.get('/', RootHandler.create());


  /**
   * @swagger
   * definition:
   *   Query:
   *     type: object
   *     required:
   *       - limit
   *     properties:
   *       from:
   *         type: date-time
   *       until:
   *         type: date-time
   *       limit:
   *         type: int64
   *       start:
   *         type: int64
   *       order:
   *         type: string
   *       fields:
   *         schema:
   *           type: array
   *           items:
   *             type: string
   */

  /**
   * @swagger
   * /logs:
   *   post:
   *     description: Query the logs written by the app
   *     parameters:
   *       - name: query
   *         description: query to fetch the logs
   *         in: body
   *         required: true
   *         type: json
   *         schema:
   *           $ref: '#/definitions/Query'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: the log entries
   */
  app.post('/logs', LogsHandler.create(logger));

  /**
   * @swagger
   * /api-docs.json:
   *   get:
   *     description: Get Swagger based API docs
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Swagger API Docs
   */
  app.get('/api-docs.json', DocsHandler.create(appInfo, [__dirname + '/server.js']));

  /**
   * @swagger
   * /config:
   *   get:
   *     description: Get Configuration in use by the Application
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Configuration in use by the Application
   */
  app.get('/config', ConfigHandler.create(conf, appConf));

  var socketServer;

  return {
    start: (callback) => {
      logger.info('starting at %s:%s', conf.get('ip'), conf.get('port'));
      socketServer = app.listen(conf.get('port'), conf.get('ip'), () => {
        logger.info('started at %s:%s', conf.get('ip'), conf.get('port'));
        callback();
      });
    },
    stop: (callback) => {
      logger.info('stopping at %s:%s', conf.get('ip'), conf.get('port'));
      socketServer.close(() => {
        logger.info('stopped at %s:%s', conf.get('ip'), conf.get('port'));
        callback();
      });
    }
  };
}

module.exports = {
  create: create
};
