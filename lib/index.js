'use strict';

var sa = require('superagent');

var _require = require('lodash'),
    merge = _require.merge;

function request(options) {
  var req = sa[options.method.toLowerCase()](options.uri).set(merge({}, options.headers, options.json ? { 'Content-Type': 'application/json' } : {})).query(options.qs ? options.qs : {}).send(options.json || options.form || options.formData);

  request.activeRequests.add(req);

  var reqPromise = new Promise(function (resolve, reject) {
    req.end(function (err, res) {
      request.activeRequests.delete(req);

      if (err || !res.ok) {
        var error = res ? res : err;
        reject(error);
      } else {
        resolve(options.getFullResponse ? res : res.body);
      }
    });
  });

  reqPromise.abort = function () {
    request.activeRequests.delete(req);
    return req.abort.apply(req, arguments);
  };

  return reqPromise;
}

request.activeRequests = new Set();

module.exports = request;