import React, { Component } from "react";
import { HashRouter, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import TimeLine from "./TimeLine";
import Login from "./Login";
import Footer from "../common-component/Footer";
import Message from "../common-component/Message";



class Top extends Component {
render () {
    return (
      <HashRouter>
        <div>
          <AppBar
            title="Takeda lab Portal"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <center>
          <Message msg="β版なんやで"/>
          <Route exact path="/" component={TimeLine} />
          <Route exact path="/login" component={Login} />
          <Footer />
          </center>
        </div>
      </HashRouter>
    );
  }
}

export default Top;
