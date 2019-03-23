//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { socket as io } from '../../socket';

//Styles
import Styles from './styles.module.scss';

//Components
import FirstTimeUX from '../FirstTimeUX';
import Settings from '../Settings';

//Animations
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

//Instruments
import { book } from '../../core/book';
import logo from '../../theme/svg/logo-short.svg';
import coin from '../../theme/svg/coin.svg';
import dashboard from '../../theme/svg/dashboard.svg';
import market from '../../theme/svg/market.svg';
import history from '../../theme/svg/history.svg';

//Analytics
import { Analytics } from '../../analytics';

//Actions
import { authActions } from '../../bus/auth/actions';
import { uiActions } from '../../bus/ui/actions';
import { profileActions } from '../../bus/profile/actions';

const mapStateToProps = (state) => ({
    balance: state.profile.get('balance'),
    bonusBalance: state.profile.get('bonusBalance'),
    level: state.profile.get('tier').level,
    nickname: state.profile.get('nickname'),
    bonusPopup: state.ui.get('bonusPopup'),
    isNew: state.profile.get('isNew'),
});

const mapDispatchToProps = {
    logout: authActions.logoutAsync,
    getUserDataAsync: authActions.getUserDataAsync,
    refreshTokensAsync: authActions.refreshTokensAsync,
    showBonusPopup: uiActions.showBonusPopup,
    openTutorial: profileActions.openTutorial,
    closeTutorial: profileActions.closeTutorial,
    settingsOpened: true,
};

const socket = io();

class Navbar extends Component {
    state = {
        opened: false,
    };

    componentDidMount = () => {
        const { getUserDataAsync, refreshTokensAsync, showBonusPopup } = this.props;

        if (!socket.connected) {
            socket.open();
        }

        socket.on('success', (data) => {
            console.log('socket -> success');
            console.log(data);
        });
        socket.on('ERROR', (data) => {
            console.log('socket -> ERROR');
            console.log(data);
        });
        socket.on('bonus', (data) => {
            showBonusPopup();
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
                    if (token) {
                        getUserDataAsync(token);
                    }
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

    _toggleTutorial = () => {
        const { isNew, openTutorial, closeTutorial } = this.props;

        if (isNew) {
            closeTutorial();
        } else {
            openTutorial();
        }
    };

    _toggleSettings = () => {
        this.setState((prevState) => ({
            settingsOpened: !prevState.settingsOpened,
        }));
    };

    _animateBonusEnter = (bonus) => {
        //element, animation in SECONDS, { from point, to point }
        gsap.fromTo(
            bonus,
            1.5,
            {
                x: 500,
            },
            {
                x: 0,
            },
        );
    };

    render() {
        const { logout, nickname, balance, level, bonusPopup, bonusBalance, isNew } = this.props;
        const { opened, settingsOpened } = this.state;

        return (
            <>
                {isNew && <FirstTimeUX closeTutorial={this._toggleTutorial} />}
                <div className={opened ? Styles.containerOpened : Styles.containerClosed}>
                    <div className={Styles.navigationContainer}>
                        <div className={Styles.logoContainer}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={Styles.balanceContainer}>
                            <p>Balance</p>
                            <p className={Styles.balance}>
                                <img src={coin} alt="" />
                                100500.56
                            </p>
                        </div>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.dashboard}
                            onClick={this._handleNav}
                            id="dashboard"
                        >
                            <img src={dashboard} alt="" />
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.market}
                            onClick={this._handleNav}
                            id="marketplace"
                        >
                            <img src={market} alt="" />
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.history}
                            onClick={this._handleNav}
                            id="history"
                        >
                            <img src={history} alt="" />
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.leaderboard}
                            onClick={this._handleNav}
                            id="leaderboard"
                        >
                            <img src={history} alt="" />
                        </NavLink>
                    </div>
                    <div className={Styles.functionalContainer}>123</div>
                </div>

                {settingsOpened && <Settings inProp={settingsOpened} />}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
