const conf = require('../conf');
const userModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getUsers = async (req, res) => { // {{{
  const idToken= req.params.id;
  userModel.find({deleted: false}, async (err, result) => {
    if (err) {res.status(500).json({'error': 'InternalServerError'}); return;}
    if (result.length) {

      res.json({'users': result});
    } else {
      console.error(result);
      res.status(404).json({'error':'User not found'});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({'error': 'DBError'});
  });
} // }}}

exports.getUserById = async (req, res) => { // {{{
  const idToken = req.params.id;
  userModel.findOne({idToken: idToken, deleted: false}, async (err, result) => {
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
} // }}}

exports.postUser = async (req, res) => { // {{{
  let body = req.body;
  const date = new Date().getTime();
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
} // }}}
