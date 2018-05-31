const request = require('request');

const jwt = require('../jwt');
const conf = require('../conf');

const get_request = async (url, query) => {
  let res = request.get({
    url: url,
    qs: query
    }, function (error, response, body) {
      console.log(body);
  });
  return res
}

exports.getAuthById = async (req, res) => {
  try {
    const code = req.query.code;
    const query = {
      client_id: conf.client_id,
      client_secret: conf.client_secret,
      code: code,
      redirect_uri: 'http://localhost:3001/#/auth'
    }
    const data = await get_request('https://slack.com/api/oauth.access', query);
    res.status(200).json({message: 'success', data: data, error: null});
  } catch (e) {
    res.status(500).json({message: 'failed', data: null, error: e});
  }
}
