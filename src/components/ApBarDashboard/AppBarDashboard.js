//Core
import React, { Component } from 'react';

//Components
import Tracker from '../Tracker';
import Dashboard from '../Dashboard/Dashboard';
import History from '../History/History';
import Leaderboard from '../Leaderboard/Leaderboard';
import MarketPlace from '../MarketPlace/MarketPlace';
import NewsTournaments from '../NewsTournaments/NewsTournaments';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { realAuth } from '../../routes';
import gsap from 'gsap';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
} from 'react-router-dom';

//Analytics
import ReactGA from 'react-ga';

class AppBarDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: props.match,
            menuButton: '',
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
        }, 5000);

        this.setState({
            menuButton: 'dashboard',
        });
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

        window.location.pathname = '/index.html';

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
        const { menuButton } = this.state;
        return (
            <Router>
                <div>
                    <div
                        key="background"
                        className={Styles.appBarDashboardBG}
                    />
                    <div key="main" className={Styles.appBarDashboardMain}>
                        <AppBar
                            position="static"
                            style={{ background: 'none', boxShadow: 'none' }}
                        >
                            <Toolbar>
                                <Typography variant="title" />
                                <div className={Styles.logo} />
                                <Link
                                    className={
                                        menuButton === 'dashboard'
                                            ? Styles.dashboardMenuActive
                                            : Styles.dashboardMenu
                                    }
                                    to={`${this.state.match.url}/dashboard`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
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
                                            ? Styles.dashboardMenuActive
                                            : Styles.dashboardMenu
                                    }
                                    to={`${this.state.match.url}/history`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
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
                                            ? Styles.dashboardMenuActive
                                            : Styles.dashboardMenu
                                    }
                                    to={`${this.state.match.url}/leaderboard`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
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
                                            ? Styles.dashboardMenuActive
                                            : Styles.dashboardMenu
                                    }
                                    to={`${this.state.match.url}/marketPlace`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
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
                                            ? Styles.dashboardMenuActive
                                            : Styles.dashboardMenu
                                    }
                                    to={`${
                                        this.state.match.url
                                    }/newsTournaments`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
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
                                        className={Styles.dashUserButton}
                                        onClick={this._handleTracker}
                                    >
                                        <img src="https://react-etc.net/files/2017-12/react-hexagon.png" />
                                        <p>{this.props.login}</p>
                                    </div>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        className={Styles.exitButton}
                                        onClick={this.handleLogOut}
                                    >
                                        <ExitToApp
                                            className={Styles.exitButtonIcon}
                                        />
                                    </Button>
                                </div>
                            </Toolbar>
                            <Tracker />
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
