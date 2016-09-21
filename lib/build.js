'use strict';

const url = require('url');

const build = opts => {
  const hostname = process.env.PUNCHCARD;
  const client = process.env.PUNCHCARD_CLIENT;
  const secret = process.env.PUNCHCARD_SECRET;

  const options = opts || {};

  return new Promise((res, rej) => {
    if (!options.endpoint) {
      rej(new Error('Endpoint needs to be declared!'));
    }

    const host = url.parse(hostname);

    const endpoint = {
      protocol: host.protocol,
      host: host.host,
      pathname: options.endpoint,
    };

    const query = {};

    const result = {
      method: 'GET',
    };

    // Sort Option
    if (options.sort) {
      query.sort = options.sort;
    }

    // Sort Direction Option
    if (options.dir) {
      query.sort_dir = options.dir; // eslint-disable-line camelcase
    }
    if (options.sort_dir) {
      query.sort_dir = options.sort_dir; // eslint-disable-line camelcase
    }

    // Pagination Option
    if (options.page) {
      query.page = options.page;
    }

    // Page Limit Option
    if (options.limit) {
      query.per_page = options.limit; // eslint-disable-line camelcase
    }
    if (options.per_page) {
      query.per_page = options.per_page; // eslint-disable-line camelcase
    }

    // If there's a client and secret, turn it in to a POST request
    if (client && secret) {
      result.method = 'POST';
      result.json = {
        client,
        secret,
      };
    }

    // Attach Query
    endpoint.query = query;

    // Attach URL
    result.url = url.format(endpoint);

    res(result);
  });
};

module.exports = build;
