const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    // firebaseからもらえるidToken
    type: String,
    required: true,
  },
  display_name: {
    // 表示名
    type: String,
    required: true,
  },
  name: {
    // 本名 スペース区切りで苗字と名前
    type: String,
    rquired: true
  },
  emailNotification: {
    // 受け取るメールの種類
    type: [String],
    required: true
  },
  email: {
    // mail address
    type: String,
    required: true
  },
  status: {
    // celeb:1, pceleb:2, common:3
    type: Number,
    required: true
  },
  gender: {
    // 性別
    type: Number,
    required: true
  },
  address: {
    family_name: {
      type: String,
      required: true
    },
    given_name: {
      type: String,
      required: true
    },
    phonetic_family_name: {
      type: String,
      required: true
    },
    phonetic_given_name: {
      type: String,
      required: true
    },
    zip_code: {
      type: String,
      required: true
    },
    prefecture: {
      type: String,
      required: true
    },
    ctiy: {
      type: String,
      required: true
    },
    building: {
      type: String,
      required: false
    }
  }
});

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27018/');

// スキーマからモデルをコンパイルし、モデルをエクスポートする
exports.userSchema = mongoose.model('userSchema', userSchema);
