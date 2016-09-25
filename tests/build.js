import test from 'ava';
import build from '../lib/build';

test('No Endpoint', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  return build().catch(e => {
    t.is(e.message, 'Endpoint needs to be declared!');
  });
});

test('Basic Endpoint', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api',
  };

  return build({
    endpoint: '/api',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Basic Endpoint - Options', t => {
  process.env.PUNCHCARD = 'foo';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api',
  };

  return build({
    endpoint: '/api',
    punchcard: 'https://punchcard.io',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Basic Endpoint, with `sort`', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?sort=key',
  };

  return build({
    endpoint: '/api',
    sort: 'key',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});


test('Basic Endpoint, with `dir`', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?sort_dir=asc',
  };

  return build({
    endpoint: '/api',
    dir: 'asc',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Basic Endpoint, with `sort_dir`', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?sort_dir=asc',
  };

  return build({
    endpoint: '/api',
    sort_dir: 'asc', // eslint-disable-line camelcase
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Basic Endpoint, with `page`', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?page=2',
  };

  return build({
    endpoint: '/api',
    page: 2,
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Basic Endpoint, with `limit`', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?per_page=15',
  };

  return build({
    endpoint: '/api',
    limit: 15,
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Basic Endpoint, with `per_page`', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?per_page=15',
  };

  return build({
    endpoint: '/api',
    per_page: 15, // eslint-disable-line camelcase
  }).then(result => {
    t.deepEqual(result, expected);
  });
});


test('Basic Endpoint, with all', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?sort=type&sort_dir=desc&page=3&per_page=5',
  };

  return build({
    endpoint: '/api',
    sort: 'type',
    dir: 'desc',
    page: 3,
    limit: 5,
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Secret Endpoint', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';
  process.env.PUNCHCARD_CLIENT = 'foo';
  process.env.PUNCHCARD_SECRET = 'bar';

  const expected = {
    method: 'POST',
    url: 'https://punchcard.io/api?sort=type&sort_dir=desc&page=3&per_page=5',
    json: {
      client: 'foo',
      secret: 'bar',
    },
  };

  return build({
    endpoint: '/api',
    sort: 'type',
    dir: 'desc',
    page: 3,
    limit: 5,
  }).then(result => {
    t.deepEqual(result, expected);
  });
});
