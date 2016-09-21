'use strict';

const request = require('request');

/*
 * Promise wrapper for Request
 */
const req = options => {
  return new Promise((res, rej) => {
    request(options, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        res(body);
      }
      else {
        rej(err);
      }
    });
  });
};

module.exports = req;
