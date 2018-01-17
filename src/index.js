const sa = require('superagent');
const {merge} = require('lodash');

function request(options) {
  const req = request.sa[options.method.toLowerCase()](options.uri)
    .set(merge({}, options.headers, options.json ? {'Content-Type': 'application/json'} : {}))
    .query(options.qs ? options.qs : {})
    .send(options.json || options.form || options.formData)
  ;

  request.activeRequests.add(req);

  const reqPromise = new Promise((resolve, reject) => {
    req.end((err, res) => {
      request.activeRequests.delete(req);

      if (err || !res.ok) {
        const error = res ? res : err;
        reject(error);
      } else {
        resolve(options.getFullResponse ? res : res.body);
      }
    });
  });

  reqPromise.abort = (...args) => {
    request.activeRequests.delete(req);
    return req.abort(...args);
  };

  return reqPromise;
}

request.activeRequests = new Set();

request.isBusy = () => request.activeRequests.size;

request.sa = sa;

module.exports = request;
