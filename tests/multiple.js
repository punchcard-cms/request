import test from 'ava';
import build from '../lib/build';
import endpoints from '../lib/endpoints';

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
