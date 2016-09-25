// /api - all
// /api/types - All types
// /api/types/:type - Specific type (all of type)
// /api/types/:type/:id -

'use strict';

// all
// types
// type
// one

const endpoints = opts => {
  const options = opts || {};

  return new Promise((res, rej) => {
    // Need a `get` parameter
    if (!options.get) {
      rej(new Error('Endpoints need to include a `get` parameter!'));
    }

    // `type` and `one` gets require a `type` parameter
    if ((options.get === 'type' || options.get === 'one') && !options.type) {
      rej(new Error(`Endpoint \`${options.get}\` requires a \`type\` parameter!`));
    }

    // `one` get requires an `id` parameter
    if (options.get === 'one' && !options.id) {
      rej(new Error('Endpoint `one` requires an `id` parameter!'));
    }

    let endpoint = '/api';

    if (['types', 'one', 'type'].indexOf(options.get.toLowerCase()) >= 0) {
      endpoint += '/types';
    }

    if (options.type) {
      endpoint += `/${options.type}`;
      delete options.type;
    }

    if (options.id) {
      endpoint += `/${options.id}`;
      delete options.id;
    }

    delete options.get;
    options.endpoint = endpoint;

    res(options);
  });
};


module.exports = endpoints;
