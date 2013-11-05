var impermium = require('./')
  , assert = require('assert')
  , http = require('http')
  , superagent = require('superagent');

impermium.API_ROOT = 'http://api-test.impermium.com/4.0/';
impermium.API_KEY = 'YOUR_API_KEY_HERE';

impermium.post({
  post_id: '123456',
  user_id: 'Kethreen007',
  content: 'I got a 9 month old Lexus IS 350 C Convertible by work part-time using a laptop. Visit Your URL........ >. BAY89.CoM',
  post_type: 'comment',
  operation: 'create',
  timestamp: '20110424191612Z'
}, function(err, res) {
  assert.equal(err, null);
  assert.equal(res.action, 'block');
  assert.deepEqual(res.tags, ['spam']);
});

impermium.post({
  post_id: '123456',
  user_id: 'someuser',
  content: 'Great pictures!',
  post_type: 'comment',
  operation: 'create',
  timestamp: '20110424191612Z'
}, function(err, res) {
  assert.equal(err, null);
  assert.equal(res.action, 'allow');
  assert.deepEqual(res.tags, []);
});

var server = http.createServer(function(req, res) {
  impermium.post({
    req: req,
    post_id: '123456',
    user_id: 'Kethreen007',
    content: 'I got a 9 month old Lexus IS 350 C Convertible by work part-time using a laptop. Visit Your URL........ >. BAY89.CoM',
    post_type: 'comment',
    operation: 'create'
  }, function(err, result) {
    res.writeHead(err ? 500 : 200);
    res.end();
  });
}).listen(0, function() {
  var port = server.address().port;
  superagent
    .get('http://127.0.0.1:' + port)
    .end(function(err, res) {
      assert.equal(res.status, 200);
      server.close();
    });
});
