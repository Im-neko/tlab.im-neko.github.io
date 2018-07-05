import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import AuthService from "../service/AuthService";
// import * as env from "../environment/environment";
import Loader from "../common-component/Loader";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {datas: [], loader: true}
    this.auth = new AuthService()
  }

  async componentWillMount () {
    await this.getTimeLine();
    this.setState({loader: false});
  }

  async getTimeLine() {
    try {
      const path = 'timeline'
      const res = await this.auth.get(path, {limit:10, page:1});
      this.setState({users: res.data.users})
    } catch(e) {
      console.log(e)
      this.setState({message: 'error'})
    }
  }

  render () {
    if (this.state.loader){
      return (
        <div className="timeline_container">
          <Loader isActive={this.state.loader}/>
        </div>
      );
    } else {
      let user_data = []
      for (var i in this.state.users) {
        const user_icon = this.state.users[i].icon;
        const user_name = this.state.users[i].display_name;
        const user_profile = this.state.users[i].profile || "no profile";
        user_data.push(
          <div className="user_container" key={user_name+'_'+i}>
            <li>
              <Divider inset />
            </li>
            <ListItem>
              <Avatar>
                <img src={user_icon} className="icon" alt="user_icon" />
              </Avatar>
              <ListItemText primary={user_name} secondary={user_profile} />
            </ListItem>
          </div>
        );
      }
      return (
        <div className="timeline_container">
        <List>
          {user_data}
          <li>
            <Divider inset />
          </li>
        </List>
        </div>
      );
    }
  }
}
