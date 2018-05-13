import React, {Component} from 'react';
import {AppBar, Button, IconButton, Popover, Toolbar, Typography} from 'material-ui';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import './ApBarDashboard.scss';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import History from '../History/History';
import Leaderboard from '../Leaderboard/Leaderboard';
import MarketPlace from '../MarketPlace/MarketPlace';
import NewsTournaments from '../NewsTournaments/NewsTournaments';


 class AppBarDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      match: props.match,
      auth: true,
      anchorEl: null,
      menuButton: 'dashboard',
    };
    this.props.addHistory();
    this.props.addLeaderBoard();
    this.props.addNews();
    console.log('constructor this.match',this.state.match);
  }

     state = {
         anchorEl: null,
     };

   handleMenu = event => {
     this.setState({
       anchorEl: event.currentTarget,
     });
   };
   handleClose = () => {
     this.setState({
       anchorEl: null,
     });
   };

  handleButtonPress= name => event => {
     this.setState({
       menuButton: name,
     });
   };

  render() {
    const {auth, anchorEl, menuButton} = this.state;
    return (
      <Router>
        <div>
          <div key="background" className="appBarDashboardBG"/>
          <div key="main" className="appBarDashboardMain">
            <AppBar position="static" style={{background: 'none'}}>
              <Toolbar>
                <Typography variant="title">
                </Typography>
                <div className="logo"/>
                <Link
                  className={menuButton==='dashboard'?'dashboardMenuActive':'dashboardMenu'}
                  to={`${this.state.match.url}/dashboard`}><Button className="buttonAppBar" onClick={this.handleButtonPress('dashboard')} >Dashboard</Button></Link>
                <Link
                  className={menuButton==='history'?'dashboardMenuActive':'dashboardMenu'}
                  to={`${this.state.match.url}/history`}><Button className="buttonAppBar" onClick={this.handleButtonPress('history')}>History</Button></Link>
                <Link
                  className={menuButton==='leaderboard'?'dashboardMenuActive':'dashboardMenu'}
                  to={`${this.state.match.url}/leaderboard`}><Button className="buttonAppBar" onClick={this.handleButtonPress('leaderboard')}>Leaderboared</Button></Link>
                <Link
                  className={menuButton==='marketPlace'?'dashboardMenuActive':'dashboardMenu'}
                  to={`${this.state.match.url}/marketPlace`}><Button className="buttonAppBar" onClick={this.handleButtonPress('marketPlace')}>Market place</Button></Link>
                <Link
                  className={menuButton==='newsTournaments'?'dashboardMenuActive':'dashboardMenu'}
                  to={`${this.state.match.url}/newsTournaments`}><Button className="buttonAppBar" onClick={this.handleButtonPress('newsTournaments')}>News and
                  Tournaments</Button></Link>
                {auth && (
                  <div>
                    <IconButton
                      style={{position: 'absolute', top: 0, right: 0}}
                      aria-owns={anchorEl ? 'menu-appbar' : null}
                      variant="raised"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle/>
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={this.handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}>
                      <MenuItem onClick={() => console.log("radu gay")}>Profile</MenuItem>
                      <MenuItem onClick={() => console.log("radu gay2")}>My account</MenuItem>
                    </Popover>
                  </div>
                )}
              </Toolbar>
            </AppBar>
              {console.log('this.state.match.url.',this.state.match.url)  }
            <Switch>
            <Route path={`${this.state.match.url}/dashboard`} component={Dashboard}/>
            <Route path={`${this.state.match.url}/history`} component={History}/>
            <Route path={`${this.state.match.url}/leaderboard`} component={Leaderboard}/>
            <Route path={`${this.state.match.url}/marketPlace`} component={MarketPlace}/>
            <Route path={`${this.state.match.url}/newsTournaments`} component={NewsTournaments}/>
            <Redirect to={`${this.state.match.url}/dashboard`} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default AppBarDashboard