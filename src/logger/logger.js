'use strict';

const winston = require('winston');

const SPACE = ' ';

function create(appInfo, conf) {
  let fileTransportOptions = {
    level: conf.get('log.level'),
    filename: conf.get('log.file.name'),
    timestamp: true,
    handleExceptions: true,
    maxsize: conf.get('log.file.maxSize'),
    maxFiles: conf.get('log.file.maxFiles')
  };

  let logger = new winston.Logger({
    exitOnError: false,
    json: true,
    level: conf.get('log.level'),
    transports: [
      new winston.transports.File(fileTransportOptions),
      new winston.transports.Console({
        level: conf.get('log.level'),
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: () => {
          return new Date().toISOString();
        },
        formatter: (options) => {
          return [
            options.timestamp(),
            appInfo.name + ':' + appInfo.version,
            options.level.toUpperCase(),
            (undefined !== options.message ? options.message : ''),
            (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '' )
          ].join(SPACE);
        }
      })
    ]
  });

  // this line allows querying the log file
  winston.add(winston.transports.File, fileTransportOptions);

  return logger;
}

module.exports = {
  create: create
};
