import React, {Component} from 'react';


import AuthService from "../service/AuthService";
// import * as env from "../environment/environment";
import Loader from "../common-component/Loader";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {loader: true}
    this.auth = new AuthService()
  }

  async componentWillMount () {
    await this.getTimeLine();
    this.setState({loader: false});
  }

  async getTimeLine() {
    try {
      const path = 'article'
      const res = await this.auth.get(path, {limit:10, page:1});
      this.setState({users: res.data.articles})
    } catch(e) {
      console.log(e)
      this.setState({message: 'error'})
    }
  }

  render () {
    if (this.state.loader){
      return (
        <div className="article_container">
          <Loader isActive={this.state.loader}/>
        </div>
      );
    } else {
      return (
        <div className="article_container">

        </div>
      );
    }
  }
}
