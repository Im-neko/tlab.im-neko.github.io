import React, { Component } from "react";
import { 
  BrowserRouter,
  Route, Switch 
 } from 'react-router-dom';

import  Auth from "./Auth";
import TimeLine  from "./TimeLine";
import Register from "./Register";
import Profile from "./Profile";
import Article from "./Article";
import PostArticle from "./PostArticle";

import Header from "../common-component/Header";



class Top extends Component {
render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={TimeLine} />
            <Route exact path="/auth" component={Register} />
            <Auth>
              <Switch>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/article/:id" component={Article} />
                <Route exact path="/post/article" component={PostArticle} />
              </Switch>
            </Auth>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Top;
