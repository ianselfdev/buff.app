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

//Instruments
import { notifications } from '../_notifications';
import { book } from '../../core/book';
import logo from '../../theme/svg/logo-short.svg';
import fullLogo from '../../theme/svg/fullLogo.svg';
import coin from '../../theme/svg/coin.svg';
import dashboard from '../../theme/svg/dashboard.svg';
import market from '../../theme/svg/market.svg';
import history from '../../theme/svg/history.svg';
import notification from '../../theme/svg/notification.svg';
import settings from '../../theme/svg/settings.svg';
import { ExitToApp } from '@material-ui/icons';

//Analytics
import { Analytics } from '../../analytics';

//Actions
import { authActions } from '../../bus/auth/actions';
import { uiActions } from '../../bus/ui/actions';
import { profileActions } from '../../bus/profile/actions';

const mapStateToProps = (state) => ({
    balance: state.profile.get('balance'),
    bonusBalance: state.profile.get('bonusBalance'),
    nickname: state.profile.get('nickname'),
    bonusPopup: state.ui.get('bonusPopup'),
    isNew: state.profile.get('isNew'),
    bonuses: state.bonuses,
});

const mapDispatchToProps = {
    logout: authActions.logoutAsync,
    getUserDataAsync: authActions.getUserDataAsync,
    refreshTokensAsync: authActions.refreshTokensAsync,
    showBonusPopup: uiActions.showBonusPopup,
    openTutorial: profileActions.openTutorial,
    closeTutorial: profileActions.closeTutorial,
};

const socket = io();

class Navbar extends Component {
    state = {
        opened: false,
        settingsOpened: false,
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

    _handleNav = (e) => {
        const { id } = e.target;
        Analytics.event('Navigation link click', { category: id });
    };

    componentWillUnmount = () => {
        socket.removeAllListeners();
        console.log('socket listeners removed');
    };

    _handleNotificationsClick = () => {
        notifications.info('Notifications panel will become available soon :)');
    };

    _toggleSettings = () => {
        this.setState((prevState) => ({
            settingsOpened: !prevState.settingsOpened,
        }));
    };

    // _toggleOpened = () => {
    //     this.setState((prevState) => ({
    //         opened: !prevState.opened,
    //     }));
    // };

    render() {
        const { nickname, balance, bonusBalance, isNew, logout, bonuses } = this.props;
        const { opened, settingsOpened } = this.state;

        return (
            <>
                {isNew && <FirstTimeUX closeTutorial={this._toggleTutorial} />}
                {/* <div className={opened ? Styles.containerOpened : Styles.containerClosed}> */}
                <div className={Styles.containerClosed}>
                    <div className={Styles.navigationContainer}>
                        <div className={Styles.logoContainer} onClick={this._toggleOpened}>
                            <img src={opened ? fullLogo : logo} alt="" />
                        </div>
                        <div className={Styles.balanceContainer}>
                            <p>Balance:</p>
                            <p className={Styles.balance}>
                                <img src={coin} alt="" />
                                {+balance + +bonusBalance}
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
                            <span>Lounge</span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.market}
                            onClick={this._handleNav}
                            id="marketplace"
                        >
                            <img src={market} alt="" />
                            <span>Marketplace</span>
                        </NavLink>
                        <NavLink
                            className={Styles.navlink}
                            activeClassName={Styles.navlinkActive}
                            to={book.history}
                            onClick={this._handleNav}
                            id="history"
                        >
                            <img src={history} alt="" />
                            <span>History</span>
                        </NavLink>
                    </div>
                    <div className={Styles.functionalContainer}>
                        {bonuses.size > 0 && (
                            <div className={Styles.bonusLabel}>{bonuses.size}</div>
                        )}
                        <div className={Styles.bonusBlock}>
                            <button>Bonus</button>
                        </div>
                        <div className={Styles.welcomeMessageBlock}>
                            <p>Welcome:</p>
                            <p className={Styles.nickname}>{nickname}</p>
                        </div>
                        <div
                            className={Styles.notificationBlock}
                            onClick={this._handleNotificationsClick}
                        >
                            <img src={notification} alt="" />
                            <span>Notifications</span>
                        </div>
                        <div className={Styles.settingsBlock} onClick={this._toggleSettings}>
                            <img src={settings} alt="" />
                            <span>Settings</span>
                        </div>
                        <div className={Styles.exitBlock} onClick={logout}>
                            <ExitToApp />
                            <span>Logout</span>
                        </div>
                    </div>
                </div>

                {settingsOpened && (
                    <Settings inProp={settingsOpened} closeSettings={this._toggleSettings} />
                )}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
