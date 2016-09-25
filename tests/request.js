import test from 'ava';
import request from '../';

test('Single', t => {
  const expected = {
    method: 'GET',
    url: 'https://punchcard.io/api?per_page=10',
  };


  return request({
    get: 'all',
    limit: 10,
    punchcard: 'https://punchcard.io',
  }).then(result => {
    t.deepEqual(result, expected);
  }).catch(e => {
    console.log(e.message); // eslint-disable-line no-console
    t.fail();
  });
});

test('Multiple', t => {
  const expected = [
    {
      method: 'GET',
      url: 'https://punchcard.io/api?per_page=10',
    },
    {
      method: 'GET',
      url: 'https://punchcard.io/api/types/foo-bar?sort_dir=desc',
    },
  ];

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
    t.deepEqual(result, expected);
  }).catch(e => {
    console.log(e.message); // eslint-disable-line no-console
    t.fail();
  });
});
