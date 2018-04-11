const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idToken: {
    // firebaseからもらえるidToken
    type: [String],
    required: true,
  },
  display_name: {
    // 表示名
    type: String,
    required: true,
  },
  user_profile: {
    intro_msg: {
      // 自己紹介
      type: String,
      required: false
    },
    link: {
      // プロフィールに載せるURL
      type: String,
      required: false
    },
    background: {
      // 経歴
      type: String,
      required: false
    },
    icon: {
      // アイコンのURL
      type: String,
      required: false
    },
    cover: {
      // カバー画像のURL
      type: String,
      required: false
    },
    name: {
      // 本名 スペース区切りで苗字と名前
      type: String,
      rquired: true
    },
    birth: {
      // unixtime
      type: Number,
      required: true
    },
    gender: {
      // 性別
      type: Number,
      required: true
    },
    email: {
      // mail address
      type: String,
      required: true
    },
    status: {
      // admin:0, celeb:1, pceleb:2, common:3, project: 4
      type: Number,
      required: true
    },
    pub_flag: {
      // 鍵垢 true: 公開アカウント
      type: Boolean,
      required: true
    }
  },
  celeb_info: {
    group: {
      // 所属団体とか
      type: String,
      required: false
    },
    category: {
      // セレブとかのカテゴリタグ
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    pickup: {
      // 話題のアカウントとか
      type: [Number],
      required: false
    },
    p_id: {
      // 親ID
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }
  },
  notification: {
    // 受け取る通知の種類mail,push
    type: [Number],
    required: true
  },
  accountant: {
    // 支払いステータス
    type: Number,
    required: false
  },
  name_card: {
    // 名刺
    type: [String],
    required: false
  },
  id_image: {
    // 個人確認書類
    type: [String],
    required: false
  },
  id_flag: {
    // 個人確認書類フラグ
    type: Number,
    required: false
  },
  address: {
    name: {
      family_name: {
        type: String,
        required: false
      },
      middle_name: {
        type: String,
        required: false
      },
      given_name: {
        type: String,
        required: false
      }
    },
    eng_name: {
      eng_family_name: {
        type: String,
        required: false
      },
      eng_middle_name: {
        type: String,
        required: false
      },
      eng_given_name: {
        type: String,
        required: false
      }
    },
    phone_number: {
      type: String,
      required: false
    },
    zip_code: {
      type: [String],
      required: false
    },
    country: {
      // 国名を引く時にareaも取得
      type: Number,
      required: false
    },
    prefecture: {
      type: String,
      required: false
    },
    ctiy: {
      type: String,
      required: false
    },
    streat_num: {
      type: String,
      required: false
    },
    building: {
      type: String,
      required: false
    }
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
