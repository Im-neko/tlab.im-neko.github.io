import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import * as qs from "qs"
import Button from '@material-ui/core/Button';

import AuthService from "../service/AuthService";
import * as env from "../environment/environment";
import '../css/main.css';


const style = {
  margin: 12
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = {query: '', teamCreateMsg: '', userCreateMsg: '', isLogin: this.auth.isLogin()};
  }

  async componentWillMount () {
    try{
      let query = qs.parse(this.props.location.search.substr(1));
      this.setState({query: query, isLogin: this.auth.isLogin()});
      if (!this.auth.isLogin() && query.code) {
        const res = await this.auth.get('auth', {code:query.code});
        const data = res.data;
        this.auth.setToken(data.jwtoken);
        const decoded = this.auth.decodeJWT();
        localStorage.setItem('team', JSON.stringify(data.team));
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('teamId', decoded.teamId);
        localStorage.setItem('userId', decoded.userId);
        this.setState({
          'team': data.team, 
          'user': data.user, 
          'teamId': ''+decoded.teamId,
          'userId': ''+decoded.userId,
          'jwtoken': data.jwtoken,
          'isLogin': this.auth.isLogin()
        });
        console.log('signup',this.state)
      } else {
        this.setState({
          'team': JSON.parse(localStorage.getItem('team')),
          'user': JSON.parse(localStorage.getItem('user')),
          'teamId': localStorage.getItem('teamId'),
          'userId': localStorage.getItem('userId'),
          'jwtoken': this.auth.getToken(),
          'isLogin': this.auth.isLogin()
        });
        console.log('login', this.state)
      }
    } catch(e) {
      if(env.debug){console.error(e);}
    }
  }


  async postTeam () {
    try{
      const path = 'teams'
      let data = {
        idToken: this.state.team.id,
        domain: this.state.team.domain,
        team: {
          display_name: this.state.team.name,
          icon: this.state.team.image_original,
        }
      }
      let res = await this.auth.post(path, data);
      console.log('team res: ', res)
      this.setState({'teamId': res.data.teamId, 'jwtoken': res.data.jwtoken});
      localStorage.setItem('teamId', res.data.teamId);
      await this.auth.setToken(res.data.jwtoken);
      window.location.reload();
      if(env.debug){console.log(res);}
    } catch (e) {
      if(env.debug){console.error('error: ', e);}
      if(e.status===403 && e.body.error==='already exists'){
        localStorage.setItem('teamId', e.body.data.teamId);
        this.setState({teamId: e.body.data.teamId});
        window.location.reload();
      }
        this.setState({teamCreateMsg: e.body.error});
    }
  }

  async postUser () {
    try{
      const path = 'users'
      let data = {
        idToken: this.state.user.id,
        user: {
          display_name: this.state.user.name,
          icon: this.state.user.image_1024,
          profile: ""
        },
        teamId: this.state.teamId,
      }
      let res = await this.auth.post(path, data);
      console.log(res)
      this.setState({'userId': res.data.userId, 'jwtoken': res.data.jwtoken});
      localStorage.setItem('userId', res.data.userId);
      this.auth.setToken(res.data.jwtoken);
      window.location.reload();
      if(env.debug){console.log(res);}
    } catch (e) {
      if(env.debug){console.error('error: ', e);}
      if(e.status===403 && e.body.error==='already exists'){
        window.location.reload();
      }
        this.setState({userCreateMsg: e.body.error});
    }
  }

  render () {
    if (this.state.teamId==='false' && this.state.team && this.auth.isLogin()){
      return (
        <div className="signup_team">
          <img src={this.state.team.image_original} className="icon" alt="teamImg" />
          {this.state.team.name}
          <div className="register_msg">
            はまだチームとして存在しません．<br />
            チームを作成しますか？
          </div>
          <Button
          style={style}
          variant="raised"
          onClick={this.postTeam.bind(this)}
          >
          チームを作成する
          </Button>
          <br />
          {this.state.temeCreateMsg}
          
        </div>
      );
    } else if(this.state.userId==='false' && this.state.user && this.auth.isLogin()) {
      return (
        <div className="signup_user">
          <img src={this.state.user.image_1024} className="icon" alt="teamImg" />
          {this.state.user.name}は
          <img src={this.state.team.image_original} className="icon" alt="teamImg"/>
          {this.state.team.name}
          <div className="register_msg">
            のメンバーとしてまだ存在していません．
            メンバーとして参加しますか？
          </div>
          <Button
          style={style}
          variant="raised"
          onClick={this.postUser.bind(this)}
          >
          メンバーとして参加する
          </Button>
          <br />
          {this.state.userCreateMsg}
        </div>
      ); 
    } else if(this.state.userId!=='false' && this.state.teamId!=='false' && this.auth.isLogin()) {
      return(<Redirect to={'/'} />);
    } else {
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
        </div>
      );      
    }
  }
}
