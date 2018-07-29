exports.root = (req, res, next) => {
  console.log(req);
  res.status(418).json(req.query);
}

exports.nyan = (req, res, next) => {
  console.log(req);
  res.status(200).json({"message": 'nyan'});
}
