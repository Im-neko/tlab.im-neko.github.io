import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import AuthService from "../service/AuthService";
// import * as env from "../environment/environment";
import Loader from "../common-component/Loader";
import Editor from "../common-component/Editor";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {loader: false, text: '# Title\n ## introduction\n - item1\n - item2\n'}
    this.auth = new AuthService()
  }

  async postArticle () {
    console.log(this.state);
    const title = this.state.text.split('\n')
    const data = {
      title: title[0] || title[1],
      text: this.state.text
    }
    const res = await this.auth.post('articles', data);
    if(res.message==='success'){
      window.location='/';
    }else{
      alert('投稿に失敗しました。 何度試してもダメなようであれば管理者に内容と共に症状を連絡してください。');
    }
  }

  setText (text) {
    this.setState({'text': text});
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
          <Editor setText={this.setText.bind(this)}/>
          <Button
            variant="raised"
            color="primary"
            onClick={this.postArticle.bind(this)}
            >
              POST
          </Button>
        </div>
      );
    }
  }
}
