var superagent = require('superagent')
  , path = require('path');

exports.API_ROOT = "https://api.impermium.com/4.0/";
exports.API_KEY = null;

exports.request = function(api, params, fn) {
  var url = exports.API_ROOT + path.join(exports.API_KEY, api);
  
  if (params.req) {
    var req = params.req;
    params.http_headers = req.headers;
    params.enduser_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1';
    
    // imperium doesn't like localhost
    if (params.enduser_ip == '127.0.0.1')
      delete params.enduser_ip;
      
    delete params.req;
  }
    
  if (!params.user_id) {
    params.user_id = 'ANONYMOUS';
  }
  
  superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(params)
    .end(function(err, res) {
      if (err) return fn(err);
      
      var body = res.body;
      if (body.status !== 200)
        return fn(new Error(body.message));
      
      fn(null, body['4.0']);
    });
};

exports.signup = function(params, fn) {
  exports.request('/signup', params, fn);
};

exports.signupAnalystFeedback = function(params, fn) {
  exports.request('/signup/analyst_feedback', params, fn);
};

exports.login = function(params, fn) {
  exports.request('/login', params, fn);
};

exports.loginAnalystFeedback = function(params, fn) {
  exports.request('/login/analyst_feedback', params, fn);
};

exports.profile = function(params, fn) {
  exports.request('/profile', params, fn);
};

exports.profileAnalystFeedback = function(params, fn) {
  exports.request('/profile/analyst_feedback', params, fn);
};

exports.post = function(params, fn) {
  exports.request('/post', params, fn);
};

exports.postAnalystFeedback = function(params, fn) {
  exports.request('/post/analyst_feedback', params, fn);
};

exports.postUserFeedback = function(params, fn) {
  exports.request('/post/user_feedback', params, fn);
};

exports.url = function(params, fn) {
  exports.request('/url', params, fn);
};

exports.urlAnalystFeedback = function(params, fn) {
  exports.request('/url/analyst_feedback', params, fn);
};

exports.urlUserFeedback = function(params, fn) {
  exports.request('/url/user_feedback', params, fn);
};

exports.message = function(params, fn) {
  exports.request('/message', params, fn);
};

exports.messageAnalystFeedback = function(params, fn) {
  exports.request('/message/analyst_feedback', params, fn);
};

exports.messageUserFeedback = function(params, fn) {
  exports.request('/message/user_feedback', params, fn);
};
