import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AuthService from "../service/AuthService";


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  searchField: {
    marginRight: 20
  },
  icon: {
    width: "48px",
    height: "48px"
  }
};

class MenuAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {anchorEl: null, user_icon: null}
    this.auth = new AuthService();
  }


  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (this.auth.isLogin()){
      const user = JSON.parse(localStorage.getItem('user'));
      const user_icon = user.image_1024
      return (
        <div className={classes.root}>
          <AppBar position="static" color="secondary" style={{boxShadow: "none"}} >
            <Toolbar>
              <IconButton className={classes.menuButton} color="primary" aria-label="Top">
              <font color="#20d9a8">■</font>
              </IconButton>
              <Typography variant="title" className={classes.flex}>
                TakedaLab.
              </Typography>
              <TextField
                className={classes.searchField}
                placeholder="Search"
                InputProps={{
                disableUnderline: true,
                }}
                InputLabelProps={{
                shrink: true,
                className: classes.bootstrapFormLabel,
                }}
              />
                <div>
                  <Button
                    variant="raised"
                    color="primary">
                      POST
                  </Button>
                  鐘
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="default"
                  >
                      <img src={user_icon} className={classes.icon} alt="user_icon" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.auth.logout}>Logout</MenuItem>
                  </Menu>
                </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <AppBar position="static" color="secondary" style={{boxShadow: "none"}} >
            <Toolbar>
              <IconButton className={classes.menuButton} color="primary" aria-label="Top">
              <font color="#20d9a8">■</font>
              </IconButton>
              <Typography variant="title" className={classes.flex}>
                TakedaLab.
              </Typography>
              <TextField
                className={classes.searchField}
                placeholder="Search"
                InputProps={{
                disableUnderline: true,
                }}
                InputLabelProps={{
                shrink: true,
                className: classes.bootstrapFormLabel,
                }}
              />
                <div>
                  <Button
                    variant="raised"
                    color="primary">
                      POST
                  </Button>
                  鐘
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="default"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.auth.Login}>Login</MenuItem>
                  </Menu>
                </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
