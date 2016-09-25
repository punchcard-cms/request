# Punchcard Request [![Build Status](https://travis-ci.org/punchcard-cms/request.svg?branch=master)](https://travis-ci.org/punchcard-cms/request) [![Coverage Status](https://coveralls.io/repos/github/punchcard-cms/request/badge.svg?branch=master)](https://coveralls.io/github/punchcard-cms/request?branch=master)

## Installation

```bash
npm i punchcard-request --save
```

## Usage

Punchcard Request can either be used to make a single request or make a collection of requests to a Punchcard API. A single request is an object with and [endpoint](#endpoints) specified, with optional [configuration](#configuration) and [API options](#api-options). To make multiple requests, collect all desired single requests in to an array. Single requests return as an `object`, collections of requests are returned as an `array`.

```javascript
const request = require('punchcard-request');

const items = [
  {
    get: 'all',
  },
  {
    get: 'types',
  },
];

request(items).then(results => {
  console.log(results); // Array of paginated content and paginated content types available
});

```

## Options

### Endpoints

All endpoints are options of the `get` parameter. Some endpoints require an additional parameter for clarity. These parameters are **required**.

* `all` - All content available
* `types` - All content types available
* `type` - All content of a specific content type. Requires an additional `type` parameter for the content type
* `one` - A single piece of content. Requires additional `type` and `id` properties for the content type and content ID

### Configuration
* `punchcard` - The URL to the root of the Punchcard install. Can also be set by setting a `PUNCHCARD` environment variable.

### API Options
* `sort` - API attribute to sort on. Can be one of `id`, `type`, `type-slug`, `key`, `key-slug`. Defaults to `key`
* `dir` `sort_dir` - Sort direction, can be one of `asc` or `desc`. Defaults to `asc`
* `page` - The page to request (for pagination). Defaults to `1`, starts at 1
* `limit` `per_page` - The max number of items to return per page (for pagination). Defaults to `30`

