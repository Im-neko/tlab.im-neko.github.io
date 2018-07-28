import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import AuthService from "../service/AuthService";
// import * as env from "../environment/environment";
import Loader from "../common-component/Loader";
import Editor from "../common-component/Editor";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {loader: false}
    this.auth = new AuthService()
  }

  async componentWillMount () {
  }

  render () {
    if (this.state.loader){
      return (
        <div className="post_article_container">
          <Loader isActive={this.state.loader}/>
        </div>
      );
    } else {
      return (
        <div className="post_article_container">
          <div id="page_header">
            Post Article
          </div>
          <Editor />
          <Button
            variant="raised"
            color="primary"
            href={'/post/article'}
            >
              POST
          </Button>
        </div>
      );
    }
  }
}
