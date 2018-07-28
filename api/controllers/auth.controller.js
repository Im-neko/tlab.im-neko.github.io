const request = require('request');

const teamModel = require("../models/team.model");
const userModel = require("../models/user.model");
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

exports.getAuthBySlack = async (req, res) => {
  try {
    const code = req.query.code;
    const query = {
      client_id: conf.slack_client_id,
      client_secret: conf.slack_client_secret,
      code: code,
      redirect_uri: conf.slack_redirect_uri
    }
    console.log('redirect_uri: ', conf.slack_redirect_uri);
    let result = await get_request('https://slack.com/api/oauth.access', query);
    console.log('data: ',result);
    result = JSON.parse(result);
    if (!result.ok) {throw [403, result.error]}
    let teamflag = await teamModel.findOne({idToken: result.team.id, deleted: false});
    let userflag = await userModel.findOne({idToken: {$in: [result.user.id]}, deleted: false});
    const jwtoken = jwt.signJWT({userId: userflag || false, teamId: teamflag || false});
    const data = { 
      user: result.user,
      team: result.team,
      jwtoken: jwtoken 
    }
    res.status(200).json({message: 'success', data: data, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}
