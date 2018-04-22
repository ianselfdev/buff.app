import React, {Component} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from 'material-ui';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import './ApBarDashboard.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import History from "../History/History";
import Leaderboard from "../Leaderboard/Leaderboard";
import MarketPlace from "../MarketPlace/MarketPlace";
import NewsTournaments from "../NewsTournaments/NewsTournaments";




export default class ApBarDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            match : props.match
        };
    }
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({auth: checked});
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {auth, anchorEl} = this.state;
    const open = Boolean(anchorEl);

    return (
        <Router>
        <div>
        <div key="background" className="appBarDashboardBG">
        </div>
        <div key="main" className="appBarDashboardMain">
          <AppBar position="static" style={{background: 'none'}}>
            <Toolbar>
              <Typography variant="title">
                <div className="logo"></div>
              </Typography>
                <Link to={`${this.state.match.url}/dashboard`}><Button className="buttonAppBar">Dashboard</Button></Link>
                <Link to={`${this.state.match.url}/history`}><Button className="buttonAppBar">History</Button></Link>
                <Link to={`${this.state.match.url}/leaderboard`}><Button className="buttonAppBar">Leaderboared</Button></Link>
                <Link to={`${this.state.match.url}/marketPlace`}><Button className="buttonAppBar">Market place</Button></Link>
                <Link to={`${this.state.match.url}/newsTournaments`}><Button className="buttonAppBar">News and Tournaments</Button></Link>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle/>
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
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>

            <Route path={`${this.state.match.url}/dashboard`} component={Dashboard} />
            <Route path={`${this.state.match.url}/history`} component={History} />
            <Route path={`${this.state.match.url}/leaderboard`} component={Leaderboard} />
            <Route path={`${this.state.match.url}/marketPlace`} component={MarketPlace} />
            <Route path={`${this.state.match.url}/newsTournaments`} component={NewsTournaments} />

        </div>
        </div>

        </Router>
    );
  }
}

