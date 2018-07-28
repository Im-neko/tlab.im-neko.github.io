if (process.env.REACT_APP_ENV !== 'production') {
  console.log('dev mode');
  console.log(process.env)
  exports.api_host = 'http://localhost:3000/v1/'
  exports.debug = true;
  exports.slack_uri_1 = 'https://slack.com/oauth/authorize?client_id=229852700674.372955700017&scope=identity.avatar,identity.basic,identity.team&redirect_uri=http://localhost:3001/auth';
}else{
  console.log('prod mode')
  console.log(process.env)
  exports.api_host = 'https://papi.keioac.jp/v1/'
  exports.debug = false;
  exports.slack_uri_1 = 'https://slack.com/oauth/authorize?client_id=229852700674.372955700017&scope=identity.avatar,identity.basic,identity.team&redirect_uri='+process.env.REACT_APP_REDIRECT_URI;
}
