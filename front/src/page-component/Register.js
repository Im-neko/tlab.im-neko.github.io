import React, { Component } from "react";
//import { Redirect } from 'react-router-dom'
import axios from 'axios';
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
    console.log(env)
  }

  async getDatas () {
    const data = await axios.get('http://localhost:3000/v1/auth?code='+this.state.query.code);
    console.log(data);
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

  slackAuth () {

  }

  render () {
    return (
      <div className="auth_container">
        <Button
          style={style}
          variant="raised"
          color="primary"
          href={env.slack_uri_1}
          >
            slackで認証する
        </Button>
        <br />
      </div>
    );
  }
}
