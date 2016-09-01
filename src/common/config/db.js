'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mongo',
  adapter: {
    mongo: {
      host: '127.0.0.1',
      port: '',
      database: 'mock',
      user: '',
      password: '',
      log_sql: true,
      log_connect: true,
      prefix: 'think_',
      encoding: 'utf8'
    }
  }
};