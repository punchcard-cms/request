import test from 'ava';
import endpoints from '../lib/endpoints';

test('No get', t => {
  return endpoints().catch(e => {
    t.is(e.message, 'Endpoints need to include a `get` parameter!');
  });
});

test('No type param, get === type', t => {
  return endpoints({
    get: 'type',
  }).catch(e => {
    t.is(e.message, 'Endpoint `type` requires a `type` parameter!');
  });
});

test('No type param, get === one', t => {
  return endpoints({
    get: 'one',
  }).catch(e => {
    t.is(e.message, 'Endpoint `one` requires a `type` parameter!');
  });
});

test('No id param, get === one', t => {
  return endpoints({
    get: 'one',
    type: 'foo',
  }).catch(e => {
    t.is(e.message, 'Endpoint `one` requires an `id` parameter!');
  });
});

test('get === all', t => {
  const expected = {
    endpoint: '/api',
  };

  return endpoints({
    get: 'all',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('get === types', t => {
  const expected = {
    endpoint: '/api/types',
  };

  return endpoints({
    get: 'types',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('get === type', t => {
  const expected = {
    endpoint: '/api/types/foo-bar',
  };

  return endpoints({
    get: 'types',
    type: 'foo-bar',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});


test('get === one', t => {
  const expected = {
    endpoint: '/api/types/foo-bar/8080-42-42-8080',
  };

  return endpoints({
    get: 'one',
    type: 'foo-bar',
    id: '8080-42-42-8080',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});

test('Has additional options', t => {
  const expected = {
    endpoint: '/api/types/foo-bar/8080-42-42-8080',
    dir: 'asc',
  };

  return endpoints({
    get: 'one',
    type: 'foo-bar',
    id: '8080-42-42-8080',
    dir: 'asc',
  }).then(result => {
    t.deepEqual(result, expected);
  });
});
