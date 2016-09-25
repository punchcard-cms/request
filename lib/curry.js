'use strict';

const build = require('./build');
const endpoints = require('./endpoints');
const wrappers = require('./wrappers');

const vindaloo = input => {
  return Promise.resolve(input)
    .then(endpoints)
    .then(build)
    .then(wrappers.request);
};

module.exports = vindaloo;
