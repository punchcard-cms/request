'use strict';

const build = require('./build');
const endpoints = require('./endpoints');

const vindaloo = input => {
  return Promise.resolve(input)
    .then(endpoints)
    .then(build);
};

module.exports = vindaloo;
