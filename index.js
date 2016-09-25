'use strict';

const curry = require('./lib/curry');

const request = endpoints => {
  let input = endpoints;
  let single = false;

  if (!Array.isArray(input)) {
    input = [input];
    single = true;
  }

  const get = input.map(curry);

  return Promise.all(get).then(result => {
    if (single) {
      return result[0];
    }

    return result;
  });
};


module.exports = request;
