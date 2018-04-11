const common = require('../common');
const conf = require('../conf');
const userModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;

const scrapeuser = async (user) => {
  let result = {}
  delete user.user_profile.name;
  delete user.user_profile.email;
  delete user.user_profile.birth;
  result._id = user._id;
  result.idToken = user.idToken;
  result.user_profile = user.user_profile;
  return result;
}

exports.getUsers = async (req, res) => {
  const idToken= req.params.id;
  userModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({'error': 'InternalServerError'}); return;}
    if (result.length) {
      let users = await Promise.all(result.map(async (user) => {
          return await scrapeuser(user)
        }));
      res.json({'users': users});
    } else {
      console.error(result);
      res.status(404).json({'error':'User not found'});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({'error': 'DBError'});
  });
}

exports.getUserById = async (req, res) => {
  const idToken = req.params.id;
  userModel.findOne({idToken: idToken}, async (err, result) => {
    if (err) {res.status(500).json({'error': 'InternalServerError'}); return;}
    if (result) {
      let user = await scrapeuser(result);
      res.json({'user': user});
    } else {
      console.error(result);
      res.status(404).json({'error': 'User not found'});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({'error': 'DBError'});
  });
}

exports.postUser = async (req, res) => {
  let body = req.body;
  const date = new Date().getTime();
  if (body.celeb_info.category) body.celeb_info.category = ObjectId(body.celeb_info.category);
  if (body.celeb_info.p_id) body.celeb_info.p_id = ObjectId(body.celeb_info.p_id);
  body.createdAt = date;
  body.updatedAt = date;
  const User = new userModel(body);
  let result = await User.save((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({'error': 'cannot create'});
    }

    if (result){
      res.json({'message': result});
    } else {
      console.error(result)
      res.status(400).json({'error': 'cannot create'});
    }
  });
}
