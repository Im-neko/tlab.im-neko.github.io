const request = require('request');

const jwt = require('../jwt');
const conf = require('../conf');

const get_request = (url, query) => {
  return new Promise((resolve, reject) => {
    let data = null;
    request.get({
      url: url,
      qs: query
    },
    (error, response, body) => {
      console.log(body)
      data = body
      if(error)reject(error);
      resolve(data);
    });
  });
}

exports.getAuthById = async (req, res) => {
  try {
    const code = req.query.code;
    const query = {
      client_id: conf.client_id,
      client_secret: conf.client_secret,
      code: code,
      redirect_uri: 'http://localhost:3001/auth'
    }
    const data = await get_request('https://slack.com/api/oauth.access', query);
    console.log('data: ',data)
    res.status(200).json({message: 'success', data: data, error: null});
  } catch (e) {
    res.status(500).json({message: 'failed', data: null, error: e});
  }
}
