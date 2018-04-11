const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27018/tlab';

mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect('mongodb://localhost:27018/tlab')
  .then(console.log('connected to mongoDB'));

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);});

module.exports = mongoose;
