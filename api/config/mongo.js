const config = require('./config');
const mongoose = require('mongoose');
const util = require('util');

mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect('mongodb://localhost:27018/devcheerdoor');
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

module.exports = mongoose;
