import React, {Component} from 'react';
import Markdown from 'react-markdown';

import AuthService from "../service/AuthService";
import Loader from "../common-component/Loader";
import CodeBlock from '../common-component/Code-block';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {loader: true}
    this.auth = new AuthService();
    this.state = {
      markdownSrc: '',
      htmlMode: 'raw'
    }
}

  async componentWillMount () {
    const {params} = this.props.match;
    this.articleId = params.id;
    const res = await this.auth.get('articles/'+this.articleId, '');
    this.setState({data: res.data.article});
    this.setState({markdownSrc: res.data.article.text});
    this.setState({loader: false});
  }


  handleMarkdownChange(evt) {
    this.setState({markdownSrc: evt.target.value})
  }

  handleControlsChange(mode) {
    this.setState({htmlMode: mode})
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
          <div className="demo">
            <div className="result-pane">
              <Markdown
                className="result"
                source={this.state.markdownSrc}
                skipHtml={this.state.htmlMode === 'skip'}
                escapeHtml={this.state.htmlMode === 'escape'}
                renderers={{code: CodeBlock}}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
