import React, { Component } from "react";
import axios from 'axios';
import * as firebase from "firebase";
import * as qs from "qs"
import Button from '@material-ui/core/Button';

import * as env from "../environment/environment";


const style = {
  margin: 12,
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''}
  }

  componentWillMount () {
    let query = qs.parse(this.props.location.search.substr(1));
    this.setState({query: query});
  }

  async sendAuthData () {
    const url = env.user_url;
    //TODO: サービス化してpost用のメソッドとか
    // 送りたいデータを入れる
    let data = {}
    try{
      let res = await axios.post(url, data, {'Content-Type': 'application/json'});
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }

  twitterAuth () {
    // Initialize Firebase
    var config = {
      // firebase のコンフィグ
    };
    firebase.initializeApp(config);
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({
        idToken: result.user.uid,
        user_name: result.additionalUserInfo.profile.name,
        icon_url: result.additionalUserInfo.profile.profile_image_url_https
      });
    }).then(async () => {
      await this.sendAuthData();
      this.setState({login: true});
    }).catch((error) => {
      console.log(error);
    });
  }

  render () {
    return (
      <div className="login_container">
        <Button
          style={style}
          variant="raised"
          color="primary">
            twitterで認証する
        </Button>
        <br />
      </div>
    );
  }
}
