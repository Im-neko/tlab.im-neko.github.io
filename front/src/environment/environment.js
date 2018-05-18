if (process.env.ENV === 'dev') {
  exports.timeline_url = 'http://localhost:3000/timeline';
  exports.user_url = 'http://localhost:3000/user';
  exports.debug = true;
}else{
  // 今はAPIサーバ建てて無いので一旦ダミー
  exports.timeline_url = '';
  exports.user_url = '';
  exports.debug = false;
}
