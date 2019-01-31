//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { book } from '../../core/book';
import {
    ExitToApp,
    Dashboard,
    History,
    Equalizer,
    Shop,
    FitnessCenter,
    Settings,
    HelpOutline,
} from '@material-ui/icons';
import coin from '../../theme/assets/coin.png';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => ({
    login: state.profile.get('login'),
    balance: state.profile.get('balance'),
    // nickname: state.profile.get('nickname'),
});

const mapDispatchToProps = {
    logout: authActions.logoutAsync,
};

class Navbar extends Component {
    state = {
        opened: false,
    };

    _handleClick = () => {
        this.setState((prevState) => ({
            opened: !prevState.opened,
        }));
    };

    render() {
        const { logout, login, balance } = this.props;
        const { opened } = this.state;

        //!__temporary data__
        const avatar = 'https://small-games.info/avko/7/175121_78533.gif';

        return (
            <Fragment>
                <div className={Styles.background} />
                <div className={opened ? Styles.containerOpened : Styles.containerClosed}>
                    <div>
                        <div className={Styles.logo} onClick={this._handleClick} />
                        <div className={Styles.profileInfo}>
                            <img src={avatar} alt="profile-pic" />
                            <div className={Styles.username}>
                                <p>{login}</p>
                                <p className={Styles.userStatus}>
                                    Status: <span>Bronze</span>
                                </p>
                            </div>
                            <div className={Styles.balance}>
                                <p>Balance</p>
                                <p className={Styles.coins}>
                                    <img src={coin} alt="coins-pic" className={Styles.coinImg} />
                                    {balance}
                                </p>
                            </div>
                        </div>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.dashboard}
                        >
                            <Dashboard className={Styles.navitemIcon} />
                            <span className={Styles.navText}>Dashboard</span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.history}
                        >
                            <History className={Styles.navitemIcon} />
                            <span className={Styles.navText}>History</span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.leaderboard}
                        >
                            <Equalizer className={Styles.navitemIcon} />
                            <span className={Styles.navText}>Leaderboard</span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.market}
                        >
                            <Shop className={Styles.navitemIcon} />
                            <span className={Styles.navText}>Marketplace</span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.tournaments}
                        >
                            <FitnessCenter className={Styles.navitemIcon} />
                            <span className={Styles.navText}>Tournaments</span>
                        </NavLink>
                    </div>

                    <div>
                        <div className={Styles.controlButton} onClick={logout}>
                            <ExitToApp className={Styles.controlButtonIcon} />
                            <span className={Styles.controlText}>Sign out</span>
                        </div>
                        <div className={Styles.controlButton}>
                            <HelpOutline className={Styles.controlButtonIcon} />
                            <span className={Styles.controlText}>Information</span>
                        </div>
                        <div className={Styles.controlButton}>
                            <Settings className={Styles.controlButtonIcon} />
                            <span className={Styles.controlText}>Settings</span>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
