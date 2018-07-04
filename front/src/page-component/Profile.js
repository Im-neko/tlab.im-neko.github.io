import React, { Component } from "react";
//import axios from 'axios';

// import * as env from "../environment/environment";
import Loader from "../common-component/Loader";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {datas: [], loader: true}
  }

  componentWillMount () {
    /*
    axios.get(env.timeline_url).then((res) => {
      let data = res.data.data;
      data.sort(function(a,b){
        if(a.max_count > b.max_count) return -1;
        if(a.max_count < b.max_count) return 1;
        return 0;
      });
      this.setState({datas: list});
      this.setState({loader: false});
    });
    */
    console.log('pre load')
    setTimeout((() => {this.setState({loader: false})}), 2000)
  }

  render () {
    if (this.state.loader){
      return (
        <div className="profile_container">
          <Loader isActive={this.state.loader}/>
        </div>
      );
    } else {
      return (
        <div className="profile_container">
          Profileをここに表示 <br />
          * テスト用に2秒loadingを出してます
        </div>
      );
    }
  }
}
