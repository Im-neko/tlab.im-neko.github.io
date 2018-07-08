const mongoose = require('mongoose');
const conf = require('./conf');
let mongoUri = '';

if (process.env.ENV === 'development') {
  mongoUri = 'mongodb://ssh.im-neko.net:27019/dev-tlab';
} else {
  console.log('prod bode')
  mongoUri = 'mongodb://user:nekoneko2255tlabportal@mongodb:27018/tlab';
}

mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect(mongoUri, )
  .then(console.log('connected to mongoDB'));

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);});

module.exports = mongoose;
