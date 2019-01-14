//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
//....

//Styles
import Styles from './styles.module.scss';

//Instruments
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

//Analytics
// import ReactGA from 'react-ga';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => ({
    login: state.profile.get('login'),
    // nickname: state.profile.get('nickname'),
});

const mapDispatchToProps = {
    logout: authActions.logoutAsync,
};

class AppBarDashboard extends Component {
    state = {
        menuButton: '',
        refreshData: null,
    };

    componentDidMount() {
        this.setState({
            menuButton: 'dashboard',
        });
    }

    render() {
        const { logout, login } = this.props;
        const { menuButton } = this.state;
        return (
            <Router>
                <div>
                    <div key="background" className={Styles.appBarDashboardBG} />
                    <div key="main" className={Styles.appBarDashboardMain}>
                        <AppBar position="static" style={{ background: 'none', boxShadow: 'none' }}>
                            <Toolbar>
                                <Typography variant="title" />
                                <div className={Styles.logo} />
                                <Link
                                    className={
                                        menuButton === 'dashboard'
                                            ? Styles.dashboardMenuActive
                                            : Styles.dashboardMenu
                                    }
                                    to={`/dashboard`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
                                        // onClick={this.handleButtonPress('dashboard')}
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
                                    to={`/history`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
                                        // onClick={this.handleButtonPress('history')}
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
                                    to={`/leaderboard`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
                                        // onClick={this.handleButtonPress('leaderboard')}
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
                                    to={`/marketPlace`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
                                        // onClick={this.handleButtonPress('marketPlace')}
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
                                    to={`/newsTournaments`}
                                >
                                    <Button
                                        className={Styles.buttonAppBar}
                                        // onClick={this.handleButtonPress('newsTournaments')}
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
                                        <p>{login}</p>
                                    </div>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        className={Styles.exitButton}
                                        onClick={logout}
                                    >
                                        <ExitToApp className={Styles.exitButtonIcon} />
                                    </Button>
                                </div>
                            </Toolbar>
                            {/* <Tracker /> */}
                        </AppBar>
                        <Switch>
                            <Route
                                path={`/dashboard`}
                                // component={Dashboard}
                                exact
                            />
                            <Route
                                path={`/history`}
                                // component={History}
                                exact
                            />
                            <Route
                                path={`/leaderboard`}
                                // component={Leaderboard}
                                exact
                            />
                            <Route
                                path={`/marketPlace`}
                                // component={MarketPlace}
                                exact
                            />
                            <Route
                                path={`/tournaments`}
                                // component={NewsTournaments}
                                exact
                            />
                            <Redirect to={`/dashboard`} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppBarDashboard);
