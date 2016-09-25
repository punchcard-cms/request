import test from 'ava';
import build from '../lib/build';
import endpoints from '../lib/endpoints';
import curry from '../lib/curry';

test('Multiple Resolves', t => {
  process.env.PUNCHCARD = 'https://punchcard.io';

  const expected = [
    {
      method: 'GET',
      url: 'https://punchcard.io/api',
    },
    {
      method: 'GET',
      url: 'https://punchcard.io/api/types?sort=key',
    },
  ];

  const items = [
    {
      endpoint: '/api',
    },
    {
      endpoint: '/api/types',
      sort: 'key',
    },
  ];

  const all = items.map(build);

  return Promise.all(all)
    .then(result => {
      t.deepEqual(result, expected);
    }).catch(e => {
      console.log(e.message); // eslint-disable-line no-console
      t.fail();
    });
});

test('Chaining One', t => {
  const input = {
    get: 'type',
    type: 'foo-bar',
    punchcard: 'https://punchcard.com',
    dir: 'asc',
  };

  const expected = {
    method: 'GET',
    url: 'https://punchcard.com/api/types/foo-bar?sort_dir=asc',
  };

  return Promise.resolve(input)
    .then(endpoints)
    .then(build)
    .then(result => {
      t.deepEqual(result, expected);
    }).catch(e => {
      console.log(e.message); // eslint-disable-line no-console
      t.fail();
    });
});

test('Chaining Multiple', t => {
  const input = [
    {
      get: 'type',
      type: 'foo-bar',
      punchcard: 'https://punchcard.com',
      dir: 'asc',
    },
    {
      get: 'one',
      type: 'waldo',
      id: '2442-1337-4224',
      punchcard: 'https://punchcard.com',
      page: 3,
      limit: 15,
    },
  ];

  const expected = [
    {
      method: 'GET',
      url: 'https://punchcard.com/api/types/foo-bar?sort_dir=asc',
    },
    {
      method: 'GET',
      url: 'https://punchcard.com/api/types/waldo/2442-1337-4224?page=3&per_page=15',
    },
  ];

  const go = input.map(curry);

  return Promise.all(go)
    .then(result => {
      t.deepEqual(result, expected);
    }).catch(e => {
      console.log(e.message); // eslint-disable-line no-console
      t.fail();
    });
});
