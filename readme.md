# request-sa
## We follow [breaking].[feature].[fix] versioning

`npm install --save request-sa`

### An universal version of the node.js library [request](https://www.npmjs.com/package/request)
### - Uses [superagent](https://www.npmjs.com/package/superagent) to achieve its "universal nature"
### Version 1.0.0

### Usage

```js
request({
  method: 'POST', // http method of the request
  headers: {}, // request headers
  qs: {}, // query string map
  json: {}, // send data like this for application/json requests. can also be set to "true",
  form: {}, // send data like this for application/x-www-form-urlencoded requests
  formData: (() => {
    const form = new FormData();
    form.append('foo', 'bar');
    form.append('file', someFile);

    return form;
  })(), // send data like this for multipart/form-data requests
  getFullResponse: false // optional, defaults to "false". By default, successful requests only return response body
}).then((resOrBody) => {
  // do something with res or body
}).catch((err) => {
  // do something with err
});
```

### Todo:
- Include cookie support.
- Include session support.
