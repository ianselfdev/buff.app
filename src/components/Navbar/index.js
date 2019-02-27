//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { socket } from '../../socket';

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
    Settings,
    HelpOutline,
} from '@material-ui/icons';
import coin from '../../theme/assets/coin.png';
import discordLogo from '../../theme/assets/Discord-Logo-White.png';

//Actions
import { authActions } from '../../bus/auth/actions';

//Analytics
import { Analytics } from '../../analytics';

const mapStateToProps = (state) => ({
    login: state.profile.get('login'),
    balance: state.profile.get('balance'),
    level: state.profile.get('tier').level,
    // nickname: state.profile.get('nickname'),
});

const mapDispatchToProps = {
    logout: authActions.logoutAsync,
    getUserDataAsync: authActions.getUserDataAsync,
    refreshTokensAsync: authActions.refreshTokensAsync,
};

class Navbar extends Component {
    state = {
        opened: false,
    };

    componentDidMount = () => {
        const { getUserDataAsync, refreshTokensAsync } = this.props;

        if (!socket.connected) {
            socket.open();
        }
        socket.on('connect', () => {
            console.log('connectedsdasdasdasd');
        });
        socket.on('success', (data) => {
            console.log('socket -> success');
            console.log(data);
        });
        socket.on('ERROR', (data) => {
            console.log('socket -> ERROR');
            console.log(data);
        });
        socket.on('bonus', (data) => {
            console.log('socket -> bonus');
            console.log(data);
        });
        console.log('socket connected ->', socket.connected);

        if (process.env.NODE_ENV === 'production') {
            //refresh tokens every minute
            if (!localStorage.getItem('intervals-set')) {
                console.log('settting new intervals');
                setInterval(refreshTokensAsync, 60000);

                //!__temp hack to update user balance and info permanently
                setInterval(() => {
                    let token = localStorage.getItem('buff-token');
                    getUserDataAsync(token);
                }, 5000);

                localStorage.setItem('intervals-set', true);
            }
        }
    };

    componentWillUnmount = () => {
        socket.removeAllListeners();
        console.log('socket listeners removed');
    };

    _handleClick = () => {
        this.setState((prevState) => ({
            opened: !prevState.opened,
        }));
    };

    _handleNav = (e) => {
        const { id } = e.target;
        Analytics.event('Navigation link click', { category: id });
    };

    render() {
        const { logout, login, balance, level } = this.props;
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
                            <img
                                src={avatar}
                                alt="profile-pic"
                                style={{
                                    border: `1.5px solid ${
                                        level === 'bronze'
                                            ? 'green'
                                            : level === 'silver'
                                            ? 'silver'
                                            : level === 'gold'
                                            ? 'goldenrod'
                                            : 'floralwhite'
                                    }`,
                                }}
                                className={level === 'platinum' ? Styles.platinum : null}
                            />
                            <div className={Styles.username}>
                                <p>{login}</p>
                                <p className={Styles.userStatus}>
                                    Status: <span>{level}</span>
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
                            onClick={this._handleNav}
                            id="dashboard"
                        >
                            <Dashboard className={Styles.navitemIcon} id="dashboard" />
                            <span className={Styles.navText} id="dashboard">
                                Dashboard
                            </span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.history}
                            onClick={this._handleNav}
                            id="history"
                        >
                            <History className={Styles.navitemIcon} id="history" />
                            <span className={Styles.navText} id="history">
                                History
                            </span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.leaderboard}
                            onClick={this._handleNav}
                            id="leaderboard"
                        >
                            <Equalizer className={Styles.navitemIcon} id="leaderboard" />
                            <span className={Styles.navText} id="leaderboard">
                                Leaderboard
                            </span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.market}
                            onClick={this._handleNav}
                            id="marketplace"
                        >
                            <Shop className={Styles.navitemIcon} id="marketplace" />
                            <span className={Styles.navText} id="marketplace">
                                Marketplace
                            </span>
                        </NavLink>
                        {/* <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.tournaments}
                            onClick={this._handleNav}
                            id="tournaments"
                        >
                            <FitnessCenter className={Styles.navitemIcon} id="tournaments" />
                            <span className={Styles.navText} id="tournaments">
                                Tournaments
                            </span>
                        </NavLink> */}
                    </div>

                    <div>
                        <div className={Styles.controlButton}>
                            <a href="https://discord.gg/fAhV4SY" target="_blank">
                                <img src={discordLogo} className={Styles.discordLogo} />
                            </a>
                            <span className={Styles.controlText}>Join us</span>
                        </div>
                        <div className={Styles.controlButton}>
                            <Settings className={Styles.controlButtonIcon} />
                            <span className={Styles.controlText}>Settings</span>
                        </div>
                        <div className={Styles.controlButton}>
                            <HelpOutline className={Styles.controlButtonIcon} />
                            <span className={Styles.controlText}>Information</span>
                        </div>
                        <div className={Styles.controlButton} onClick={logout}>
                            <ExitToApp className={Styles.controlButtonIcon} />
                            <span className={Styles.controlText}>Sign out</span>
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
