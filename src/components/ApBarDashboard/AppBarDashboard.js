import React, { Component } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
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

//instruments
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

//Analytics
import ReactGA from 'react-ga';

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
        // this.props.addOnlineUsers();
        setTimeout(() => {
            this.props.addHistory(this.props.token);
            this.props.addUserBalance(this.props.token);
        }, 1000);
    }

    componentDidMount() {
        this.state.refreshData = setInterval(() => {
            this.props.addHistory(this.props.token);
            this.props.addUserBalance(this.props.token);
            this.props.addLeaderBoardDota();
            this.props.addLeaderBoardLOL();
            this.props.addNews();
            this.props.addTournaments();
            // this.props.addOnlineUsers();
        }, 5000);

        setTimeout(() => {
            this.setState({
                tracker: true,
            });
        }, 300);
    }

    _toggleTracker = () => {
        this.setState((prevState) => ({
            tracker: !prevState.tracker,
        }));
    };

    _handleTracker = () => {
        this.setState((prevState) => ({
            tracker: !prevState.tracker,
        }));
    };

    handleLogOut = () => {
        const localStorage = window.localStorage;
        localStorage.removeItem('buff-login');
        localStorage.removeItem('buff-password');

        window.location.pathname = '/';

        clearInterval(this.state.refreshData);
        this.props.logout();
        this.props.onBackToLogin();
        realAuth.signout();
    };
    handleButtonPress = (name) => (event) => {
        ReactGA.event({
            category: 'Menu',
            action: name,
        });

        this.setState({
            menuButton: name,
        });
    };

    //animation section
    _animateTrackerEnter = (tracker) => {
        //element, animation in SECONDS, { from point, to point }
        gsap.fromTo(
            tracker,
            0.3,
            {
                opacity: 0,
            },
            {
                opacity: 1,
            },
        );
    };

    _animateTrackerExit = (tracker) => {
        //element, animation in SECONDS, { from point, to point }
        gsap.fromTo(
            tracker,
            0.3,
            {
                opacity: 1,
            },
            {
                opacity: 0,
            },
        );
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
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
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
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
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
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
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
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
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
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
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
                                        <p>{this.props.login}</p>
                                    </div>

                                    {/* {tracker ? (
                                        <Transition
                                            in={tracker}
                                            appear
                                            timeout={300}
                                            onEnter={this._animateTrackerEnter}
                                            onExit={this._animateTrackerExit}
                                        >
                                            <div className="buff-tracker">
                                                <Tracker
                                                    _toggleTracker={
                                                        this._toggleTracker
                                                    }
                                                />
                                            </div>
                                        </Transition>
                                    ) : null} */}

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
                                exact
                            />
                            <Route
                                path={`${this.state.match.url}/history`}
                                component={History}
                                exact
                            />
                            <Route
                                path={`${this.state.match.url}/leaderboard`}
                                component={Leaderboard}
                                exact
                            />
                            <Route
                                path={`${this.state.match.url}/marketPlace`}
                                component={MarketPlace}
                                exact
                            />
                            <Route
                                path={`${this.state.match.url}/newsTournaments`}
                                component={NewsTournaments}
                                exact
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
