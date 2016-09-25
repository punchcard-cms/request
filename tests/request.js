import test from 'ava';
import nock from 'nock';
import request from '../';

const all = {
  items: [
    {
      id: '56e69b69-e0cf-41f7-9fa5-871e3ea1d4bb',
      type: 'Foo Bar',
      type_slug: 'foo-bar', // eslint-disable-line camelcase
      key: 'Punchcard Test',
      key_slug: 'punchcard-test', // eslint-disable-line camelcase
      meta: {
        url: '/api/types/foo-bar/56e69b69-e0cf-41f7-9fa5-871e3ea1d4bb',
      },
    },
    {
      id: 'a22942ca-0456-4c10-8ec1-1b622c3b853f',
      type: 'Baz',
      type_slug: 'baz', // eslint-disable-line camelcase
      key: 'Punchcard Test-2',
      key_slug: 'punchcard-test-2', // eslint-disable-line camelcase
      meta: {
        url: '/api/types/baz/a22942ca-0456-4c10-8ec1-1b622c3b853f',
      },
    },
  ],
  pages: {
    first: false,
    prev: false,
    next: false,
    last: false,
  },
};

const one = {
  items: [
    {
      id: '56e69b69-e0cf-41f7-9fa5-871e3ea1d4bb',
      type: 'Foo Bar',
      type_slug: 'foo-bar', // eslint-disable-line camelcase
      key: 'Punchcard Test',
      key_slug: 'punchcard-test', // eslint-disable-line camelcase
      meta: {
        url: '/api/types/foo-bar/56e69b69-e0cf-41f7-9fa5-871e3ea1d4bb',
      },
    },
  ],
  pages: {
    first: false,
    prev: false,
    next: false,
    last: false,
  },
};


test('Single', t => {
  // Mock API
  nock('https://punchcard.io')
    .get('/api')
    .query({
      per_page: '10', // eslint-disable-line camelcase
    })
    .reply(200, all);

  return request({
    get: 'all',
    limit: 10,
    punchcard: 'https://punchcard.io',
  }).then(result => {
    console.log(result);
    t.deepEqual(result, all);
  }).catch(e => {
    console.log(e.message); // eslint-disable-line no-console
    t.fail();
  });
});

test('Multiple', t => {
  // Mock API
  nock('https://punchcard.io')
    .get('/api')
    .query({
      per_page: '10', // eslint-disable-line camelcase
    })
    .reply(200, all);

  // Mock Types
  nock('https://punchcard.io')
    .get('/api/types/foo-bar')
    .query({
      sort_dir: 'desc', // eslint-disable-line camelcase
    })
    .reply(200, one);

  const items = [
    {
      get: 'all',
      limit: 10,
      punchcard: 'https://punchcard.io',
    },
    {
      get: 'types',
      type: 'foo-bar',
      dir: 'desc',
      punchcard: 'https://punchcard.io',
    },
  ];

  return request(items).then(result => {
    console.log(result);
    t.deepEqual(result, [all, one]);
  }).catch(e => {
    console.log(e.message); // eslint-disable-line no-console
    t.fail();
  });
});
