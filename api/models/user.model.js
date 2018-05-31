const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idToken: {
    // slackからもらえるid
    type: [String],
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
    type: [mongoose.SchemaTypes.ObjectId],
    required: true
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
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
