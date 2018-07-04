import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import AuthService from '../service/AuthService';
import * as env from "../environment/environment";


export default class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.auth = new AuthService();
    }
  
    componentWillMount () {
      if(env.debug){console.log('isLogin',this.auth.isLogin())};
    }
  
    render () {
      if (this.auth.isLogin()) {
        return (this.props.children);
      } else {
        return (
          <Redirect to={'/login'}/>
        )
      }
  }
}