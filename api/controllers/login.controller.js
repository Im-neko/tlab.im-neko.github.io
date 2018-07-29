const userModel = require("../models/user.model");
const jwt = require('../config/jwt');

exports.login = async (req, res) => {
  try {
    if (typeof(req.body.idToken) !== 'string') {throw [403, 'Invalid Token']}
    const userId = req.body.userId
    console.log(idToken);
    let user = await userModel.findOne({userI: userId, deleted: false});
    const signjwt = async (user) => {
      return await jwt.signJWT({'userId': user._id});
    };
    res.status(200).json({message: 'success', data: {token: signjwt}, error: null});
  } catch (e) {
    res.status(500).json({message: 'failed', data: null, error: e});
  }
}
