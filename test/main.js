const assert = require('assert');

const request = require('../src');

function run() {
  return testGetWithQueryString()
    .then(() => testPostWithJSON())
    .then(() => testPostWithForm())
    .then(() => testPostWithFormData())
    .then(() => testAbort())
    .then(() => testIsBusy())
    .then(() => testGetFullResponse())
  ;
}

function getSuperAgentMock(others) {
  return {
    _marks: [],
    endFn: () => {},
    _mark(fn, args) {
      this._marks.push({fn, args});
      return this;
    },
    set(...args) {
      return this._mark('set', args);
    },
    query(...args) {
      return this._mark('query', args);
    },
    send(...args) {
      return this._mark('send', args);
    },
    abort(...args) {
      return this._mark('abort', args);
    },
    end(fn) {
      this._mark('end', fn);
      this.endFn = fn;
      return this;
    },
    callEnd(err, res) {
      this.endFn(err, res);
      return this;
    },
    ...others
  };
}

function testGetWithQueryString() {
  request.sa = getSuperAgentMock({
    get(...args) { return this._mark('get', args); }
  });

  const  reqPromise = request({
    method: 'GET',
    qs: {x: 1, y: 2}
  });

  setTimeout(() => request.sa.callEnd(null, {ok: true, body: 'foo'}), 300);

  return reqPromise.then((res) => {
    assert.ok(res === 'foo');
  }).catch((err) => {
    console.log(err);
  });
}

function testPostWithJSON() {
}

function testPostWithForm() {
}

function testPostWithFormData() {
}

function testAbort() {
}

function testIsBusy() {
} 

function testGetFullResponse() {
}

if (require.main === module) {
  run();
}
