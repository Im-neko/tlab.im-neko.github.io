import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class extends Component {
  render () {
      if(this.props.isActive){
        return (
          <div>
            <center>
              <CircularProgress size={80}/>
            </center>
          </div>
        );
      } else{
          return null;
      }
  }
}
