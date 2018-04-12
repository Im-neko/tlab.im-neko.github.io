const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idToken: {
    // slackからもらえるid
    type: [String],
    required: true,
  },
  display_name: {
    // 表示名
    type: String,
    required: true,
  },
  createdAt: {
    // unixtime
    type: Number,
    required: true
  },
  updatedAt: {
    // unixtime
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
