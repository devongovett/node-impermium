# node-impermium

A Node.js client for [impermium](https://impermium.com/api/index.php?client=endevver&version=4.0&ref=93a3f).

## Docs

```javascript
var impermium = require('impermium');
impermium.API_KEY = 'YOUR_API_KEY_HERE';

impermium.post({
  post_id: '123456',
  user_id: 'some-user-id',
  content: 'This is some spam content. Viagra viagra viagra.',
  post_type: 'comment',
  operation: 'create'
}, function(err, res) {
  // do something with response
});
```

Generally, the imperium module has functions of the same names as the HTTP routes
documented in the impermium [API docs](https://impermium.com/api/index.php?client=endevver&version=4.0&ref=93a3f),
but the names are camel cased.  So for example, the `/post/user_feedback` route maps to
the `postUserFeedback` function in `node-impermium`.  Each function takes an options
object and a callback.

In addition to the options documented by impermium, you can also set the `req` option to 
a Node [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
to automatically set the `http_headers`, and `enduser_ip` impermium options automatically.

Finally, if you don't set the `user_id` option, it will be set to `"ANONYMOUS"` by default.

## Running the tests

You'll need to set the `API_KEY` property in test.js to your API key from 
impermium in order to run the tests.

## License

MIT
