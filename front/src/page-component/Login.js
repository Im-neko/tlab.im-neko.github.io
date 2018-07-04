import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import * as qs from "qs"
import Button from '@material-ui/core/Button';

import AuthService from "../service/AuthService";
import * as env from "../environment/environment";


const style = {
  margin: 12,
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.auth = new AuthService();
  }

  async componentWillMount () {
    let query = qs.parse(this.props.location.search.substr(1));
    this.setState({query: query});
    if (query.code && !this.auth.isLogin()) {
      try{
        const res = await this.auth.get('auth', {code:query.code});
        console.log(res);
        const data = res.data.data;
        if(env.debug){console.log(data);}
        localStorage.setItem('team', JSON.stringify(data.team));
        localStorage.setItem('user', JSON.stringify(data.user));
        this.auth.Login(data.user);
        if(env.debug){console.log('isLogin: ',this.auth.isLogin());}
      } catch (e) {
        console.error(e);
      }
    }
  }

  render () {
    if (this.auth.isLogin()) {
      return (
        <Redirect to={'/'} />
      );
    } else {
      return (
        <div className="auth_container">
          <Button
            style={style}
            variant="raised"
            color="primary"
            href={env.slack_uri_1}
            >
              Login
          </Button>
        </div>
      );
    }
  }
}
