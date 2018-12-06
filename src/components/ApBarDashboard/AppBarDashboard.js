import React, { Component } from 'react';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, { MenuItem } from '@material-ui/core/Menu';
import './ApBarDashboard.scss';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
} from 'react-router-dom';
import Tracker from '../Tracker';
import Dashboard from '../Dashboard/Dashboard';
import History from '../History/History';
import Leaderboard from '../Leaderboard/Leaderboard';
import MarketPlace from '../MarketPlace/MarketPlace';
import NewsTournaments from '../NewsTournaments/NewsTournaments';
import { realAuth } from '../../routes';

class AppBarDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: props.match,
            tracker: false,
            menuButton: 'dashboard',
            refreshData: null,
        };
        this.props.addLeaderBoardDota();
        this.props.addLeaderBoardLOL();
        this.props.addNews();
        this.props.addTournaments();
        this.props.addOnlineUsers();
        setTimeout(() => {
            this.props.addHistory(this.props.address);
            this.props.addUserBalance(this.props.address);
        }, 1000);
    }

    componentDidMount() {
        this.state.refreshData = setInterval(() => {
            this.props.addHistory(this.props.address);
            this.props.addUserBalance(this.props.address);
            this.props.addLeaderBoardDota();
            this.props.addLeaderBoardLOL();
            this.props.addNews();
            this.props.addTournaments();
            this.props.addOnlineUsers();
        }, 5000);
    }

    _handleTracker = () => {
        this.setState((prevState) => ({
            tracker: !prevState.tracker,
        }));
    };

    handleLogOut = () => {
        clearInterval(this.state.refreshData);
        this.props.logout();
        this.props.onBackToLogin();
        realAuth.signout();
    };
    handleButtonPress = (name) => (event) => {
        this.setState({
            menuButton: name,
        });
    };

    render() {
        const { tracker, menuButton } = this.state;
        return (
            <Router>
                <div>
                    <div key="background" className="appBarDashboardBG" />
                    <div key="main" className="appBarDashboardMain">
                        <AppBar
                            position="static"
                            style={{ background: 'none' }}
                        >
                            <Toolbar>
                                <Typography variant="title" />
                                <div className="logo" />
                                <Link
                                    className={
                                        menuButton === 'dashboard'
                                            ? 'dashboardMenuActive'
                                            : 'dashboardMenu'
                                    }
                                    to={`${this.state.match.url}/dashboard`}
                                >
                                    <Button
                                        className="buttonAppBar"
                                        onClick={this.handleButtonPress(
                                            'dashboard',
                                        )}
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <Link
                                    className={
                                        menuButton === 'history'
                                            ? 'dashboardMenuActive'
                                            : 'dashboardMenu'
                                    }
                                    to={`${this.state.match.url}/history`}
                                >
                                    <Button
                                        className="buttonAppBar"
                                        onClick={this.handleButtonPress(
                                            'history',
                                        )}
                                    >
                                        History
                                    </Button>
                                </Link>
                                <Link
                                    className={
                                        menuButton === 'leaderboard'
                                            ? 'dashboardMenuActive'
                                            : 'dashboardMenu'
                                    }
                                    to={`${this.state.match.url}/leaderboard`}
                                >
                                    <Button
                                        className="buttonAppBar"
                                        onClick={this.handleButtonPress(
                                            'leaderboard',
                                        )}
                                    >
                                        Leaderboard
                                    </Button>
                                </Link>
                                <Link
                                    className={
                                        menuButton === 'marketPlace'
                                            ? 'dashboardMenuActive'
                                            : 'dashboardMenu'
                                    }
                                    to={`${this.state.match.url}/marketPlace`}
                                >
                                    <Button
                                        className="buttonAppBar"
                                        onClick={this.handleButtonPress(
                                            'marketPlace',
                                        )}
                                    >
                                        Market place
                                    </Button>
                                </Link>
                                <Link
                                    className={
                                        menuButton === 'newsTournaments'
                                            ? 'dashboardMenuActive'
                                            : 'dashboardMenu'
                                    }
                                    to={`${
                                        this.state.match.url
                                    }/newsTournaments`}
                                >
                                    <Button
                                        className="buttonAppBar"
                                        onClick={this.handleButtonPress(
                                            'newsTournaments',
                                        )}
                                    >
                                        News and Tournaments
                                    </Button>
                                </Link>

                                <div>
                                    <div
                                        className={
                                            tracker
                                                ? 'dash-user-button-active'
                                                : 'dash-user-button'
                                        }
                                        onClick={this._handleTracker}
                                    >
                                        <img src="https://react-etc.net/files/2017-12/react-hexagon.png" />
                                        <p>{this.props.username}</p>
                                    </div>
                                    <div
                                        className={`buff-tracker ${
                                            tracker ? null : 'hidden'
                                        }`}
                                    >
                                        <Tracker />
                                    </div>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        className="exitButton"
                                        onClick={this.handleLogOut}
                                    >
                                        SIGN OUT
                                    </Button>
                                </div>
                            </Toolbar>
                        </AppBar>
                        <Switch>
                            <Route
                                path={`${this.state.match.url}/dashboard`}
                                component={Dashboard}
                            />
                            <Route
                                path={`${this.state.match.url}/history`}
                                component={History}
                            />
                            <Route
                                path={`${this.state.match.url}/leaderboard`}
                                component={Leaderboard}
                            />
                            <Route
                                path={`${this.state.match.url}/marketPlace`}
                                component={MarketPlace}
                            />
                            <Route
                                path={`${this.state.match.url}/newsTournaments`}
                                component={NewsTournaments}
                            />
                            <Redirect
                                to={`${this.state.match.url}/dashboard`}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default AppBarDashboard;
