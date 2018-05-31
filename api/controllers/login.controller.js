const firebase = require('firebase-admin')

const userModel = require("../models/user.model");
const jwt = require('../jwt');
const conf = require('../conf');

exports.login = async (req, res) => {
  try {
    if (typeof(req.body.idToken) !== 'string') return res.status(403).json({'error': 'Invalid Token'});
    const idToken = req.body.idToken;
    console.log(idToken);
    let user = await userModel.findOne({idToken: idToken, deleted: false}, async (err, result) => {
      return result;
    });
    const signjwt = async (user) => {
      return await jwt.signJWT({'userId': user._id});
    };
    res.status(200).json({message: 'success', data: {token: signjwt}, error: null});
  } catch (e) {
    res.status(500).json({message: 'failed', data: null, error: e});
  }
}
