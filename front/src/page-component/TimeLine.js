import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

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
    const path = 'timeline'
    const res = await this.auth.get(path, {limit:10, page:1});
    console.log(res)
  }

  render () {
    if (this.state.loader){
      return (
        <div className="timeline_container">
          <Loader isActive={this.state.loader}/>
        </div>
      );
    } else {
      let datas = [];
      return (
        <div className="timeline_container">
        <List>
          <ListItem>
            <Avatar>
              {this.state.datas.icon}
            </Avatar>
            <ListItemText primary={this.state.datas.title} secondary={this.state.datas.name} />
          </ListItem>
        </List>
        </div>
      );
    }
  }
}
