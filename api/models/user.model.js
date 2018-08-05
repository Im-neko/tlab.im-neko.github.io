const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idToken: {
    // 今の所slackからもらえるid
    type: String,
    required: true,
  },
  user: {
    display_name: {
      // 表示名
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    profile: {
      type: String
    }
  },
  teamIds: {
    type: mongoose.SchemaTypes.ObjectId
  },
  created: {
    // unixtime
    type: Number,
    required: true
  },
  updated: {
    // unixtime
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean
  }
});

module.exports = mongoose.model('User', userSchema);
