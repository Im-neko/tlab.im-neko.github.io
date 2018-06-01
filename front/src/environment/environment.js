if (process.env.NODE_ENV === 'development') {
  console.log('dev mode');
  exports.api_host = 'http://localhost:3000/v1'
  exports.timeline_url = 'http://localhost:3000/timeline';
  exports.user_url = 'http://localhost:3000/user';
  exports.debug = true;
  exports.slack_uri_1 = 'https://slack.com/oauth/authorize?client_id=229852700674.372955700017&scope=identity.avatar,identity.basic,identity.team&redirect_uri=http://localhost:3001/auth'
}else{
  console.log('prod mode');
  // 今はAPIサーバ建てて無いので一旦ダミー
  exports.timeline_url = '';
  exports.user_url = '';
  exports.debug = false;
}
