var express = require('express');
var router = express.Router();
var conf = require('../conf');

exports.root = (req, res, next) => {
  console.log(req);
  res.status(418).json(req.query);
}

exports.nyan = (req, res, next) => {
  console.log(req);
  res.status(418).json({"message": req.query});
}
