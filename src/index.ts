/// <reference path="../typings.d.ts" />

import search from './lib/search';
import getPalette from './lib/getPalette';
import LambdaProxy from './lib/lambdaProxy';

export function handler(event, context, callback) {

  const proxy = new LambdaProxy(event, context, callback);
  const body = proxy.getBody() || {};

  getPalette(body.url)
    .then((palette) => search(palette))
    .then((result) => proxy.response(result[0]))
    .catch((error) => callback(error));
};
