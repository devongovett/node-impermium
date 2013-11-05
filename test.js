var impermium = require('./')
  , assert = require('assert');

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
  user_id: 'Kethreen007',
  content: 'This story is great. I love Storify.',
  post_type: 'comment',
  operation: 'create',
  timestamp: '20110424191612Z'
}, function(err, res) {
  assert.equal(err, null);
  assert.equal(res.action, 'allow');
  assert.deepEqual(res.tags, []);
});