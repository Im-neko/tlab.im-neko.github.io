const firebase = require('firebase-admin')

const conf = require('../conf');

exports.login = async (req, res) => {
  if (typeof(req.body.idToken) !== 'string') return res.status(403).json({'error': 'Invalid Token'});
  const idToken = req.body.idToken;
  console.log(idToken);
  const signjwt = async (idToken) => {
    return await common.signJWT({'idToken': idToken});
    };

  const getoken = async () => {
    let token = await signjwt(idToken);
    res.json({'token': token});
  }

  getoken()
    .catch((error) => {
      console.log(error);
      res.status(500).json({'error': 'Internal Server Error'});
    });
}
