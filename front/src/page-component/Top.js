import React, { Component } from "react";
import { 
  BrowserRouter,
  Route, Switch 
 } from 'react-router-dom';

import  Auth from "./Auth";
import TimeLine from "./TimeLine";
import Register from "./Register";
import Profile from "./Profile";

import Footer from "../common-component/Footer";
import Message from "../common-component/Message";
import Header from "../common-component/Header";



class Top extends Component {
render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Message msg="β版なんやで"/>
          <Switch>
            <Route exact path="/" component={TimeLine} />
            <Route exact path="/auth" component={Register} />
            <Auth>
              <Switch>
                <Route exact path="/profile" component={Profile} />
              </Switch>
            </Auth>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Top;
