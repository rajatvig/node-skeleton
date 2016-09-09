'use strict';

require('dotenv').config({silent: true});

const convict = require('convict');

const conf = convict({
  env: {
    doc: 'environment.',
    format: ['production', 'development', 'test', 'staging'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'IP address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  uriCouch: {
    doc: 'datbaase to connect to',
    format: String,
    env: 'URI_COUCH'
  },
  log: {
    level: {
      doc: 'logger level',
      format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      default: 'debug',
      env: 'LOG_LEVEL'
    },
    logMeta: {
      doc: 'log request/response level headers',
      format: Boolean,
      default: false,
      env: 'LOG_META'
    },
    file: {
      name: {
        doc: 'the local file to write logs to',
        format: String,
        default: './logs/app.log',
        env: 'LOG_FILE'
      },
      maxSize: {
        doc: 'maximum size of the log file',
        format: Number,
        default: 1024 * 1024,
        env: 'LOG_FILE_MAX_SIZE'
      },
      maxFiles: {
        doc: 'maximum number of the log files to backup',
        format: Number,
        default: 2,
        env: 'LOG_FILE_MAX_FILES'
      }
    }
  }
});

conf.validate({strict: true});

module.exports = conf;
