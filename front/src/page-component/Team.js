import React, { Component } from "react";

// import * as env from "../environment/environment";
import Loader from "../common-component/Loader";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {datas: [], loader: true}
  }

  componentWillMount () {
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
          Team情報をここに表示 <br />
          * テスト用に2秒loadingを出してます
        </div>
      );
    }
  }
}
