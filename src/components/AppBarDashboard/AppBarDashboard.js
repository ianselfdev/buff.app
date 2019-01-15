//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { book } from '../../core/book';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';

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
    render() {
        const { logout, login } = this.props;
        return (
            <div>
                <div key="background" className={Styles.appBarDashboardBG} />
                <div key="main" className={Styles.appBarDashboardMain}>
                    <AppBar position="static" style={{ background: 'none', boxShadow: 'none' }}>
                        <Toolbar>
                            <Typography variant="title" />
                            <div className={Styles.logo} />
                            <NavLink
                                className={Styles.dashboardMenu}
                                activeClassName={Styles.active}
                                to={book.dashboard}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                className={Styles.dashboardMenu}
                                activeClassName={Styles.active}
                                to={book.history}
                            >
                                History
                            </NavLink>
                            <NavLink
                                className={Styles.dashboardMenu}
                                activeClassName={Styles.active}
                                to={book.leaderboard}
                            >
                                Leaderboard
                            </NavLink>
                            <NavLink
                                className={Styles.dashboardMenu}
                                activeClassName={Styles.active}
                                to={book.market}
                            >
                                Marketplace
                            </NavLink>
                            <NavLink
                                className={Styles.dashboardMenu}
                                activeClassName={Styles.active}
                                to={book.tournaments}
                            >
                                News and tournaments
                            </NavLink>

                            <div>
                                <div className={Styles.dashUserButton}>
                                    <img
                                        src="https://react-etc.net/files/2017-12/react-hexagon.png"
                                        alt="userIcon"
                                    />
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
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppBarDashboard);
