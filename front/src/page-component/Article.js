import React, {Component} from 'react';

import AuthService from "../service/AuthService";
import Loader from "../common-component/Loader";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {loader: true}
    this.auth = new AuthService();
  }

  async componentWillMount () {
    const {params} = this.props.match;
    this.articleId = params.id;
    const res = await this.auth.get('articles/'+this.articleId, '');
    this.setState({data: res.data.article});
    this.setState({loader: false});
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
          {this.state.data.text}
        </div>
      );
    }
  }
}
