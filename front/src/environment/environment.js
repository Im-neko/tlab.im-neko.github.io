if (process.env.NODE_ENV === 'development') {
  console.log('dev mode');
  exports.api_host = 'http://localhost:3000/v1/'
  exports.debug = true;
  exports.slack_uri_1 = 'https://slack.com/oauth/authorize?client_id=229852700674.372955700017&scope=identity.avatar,identity.basic,identity.team'
}else{
  exports.api_host = 'https://papi.keioac.jp/v1/'
  exports.debug = false;
  exports.slack_uri_1 = 'https://slack.com/oauth/authorize?client_id=229852700674.372955700017&scope=identity.avatar,identity.basic,identity.team'
}
