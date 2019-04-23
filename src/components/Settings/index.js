//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Instruments
import Switch from 'react-switch';
import { notifications } from '../_notifications';
import close from '../../theme/svg/close.svg';

//Styles
import Styles from './styles.module.scss';

//Actions
import { profileActions } from '../../bus/profile/actions';

const mapStateToProps = (state) => ({
    nickname: state.profile.get('nickname'),
    email: state.profile.get('email'),
});

const mapDispatchToProps = {
    updateNicknameAsync: profileActions.updateNicknameAsync,
    updateEmailAsync: profileActions.updateEmailAsync,
};

class Settings extends Component {
    state = {
        checkedNotifications: true,
        checkedAutoLaunch: true,
        nicknameEditMode: false,
        emailEditMode: false,
        nickname: '',
        email: '',
    };

    componentDidMount = () => {
        const { nickname, email } = this.props;
        const checkedNotifications =
            localStorage.getItem('buff-notifications') === 'false' ? false : true;

        this.setState({
            nickname,
            email,
            checkedNotifications,
        });
    };

    _toggleCheckedNotifications = () => {
        const { checkedNotifications } = this.state;

        if (checkedNotifications) {
            localStorage.setItem('buff-notifications', false);
            notifications.info(`You won't recieve notifications anymore`);
        } else {
            localStorage.setItem('buff-notifications', true);
            notifications.info(`Notifications enabled!`);
        }

        this.setState((prevState) => ({
            checkedNotifications: !prevState.checkedNotifications,
        }));
    };

    _toggleNicknameEditMode = () => {
        const { nicknameEditMode, nickname } = this.state;
        const { updateNicknameAsync, closeSettings } = this.props;

        if (nicknameEditMode) {
            if (!/^[a-zA-Z0-9]*$/.test(nickname)) {
                notifications.error('Nickname must contain only alphanumeric characters');
                return null;
            }

            if (nickname.length >= 6 && nickname.length <= 18) {
                updateNicknameAsync(nickname);

                this.setState((prevState) => ({
                    nicknameEditMode: !prevState.nicknameEditMode,
                }));
                closeSettings();
                return;
            } else {
                notifications.error('Nickname length must be 6-18 characters long');
                return null;
            }
        }

        this.setState((prevState) => ({
            nicknameEditMode: !prevState.nicknameEditMode,
        }));
    };

    _toggleEmailEditMode = () => {
        const { emailEditMode, email } = this.state;
        const { updateEmailAsync, closeSettings } = this.props;

        if (emailEditMode) {
            if (email.includes('@') && email.length > 6) {
                updateEmailAsync(email);

                this.setState((prevState) => ({
                    emailEditMode: !prevState.emailEditMode,
                }));
                closeSettings();
                return;
            } else {
                notifications.error('Email must be a valid email');
                return null;
            }
        }

        this.setState((prevState) => ({
            emailEditMode: !prevState.emailEditMode,
        }));
    };

    _handleInput = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const {
            checkedNotifications,
            // checkedAutoLaunch,
            nickname,
            email,
            nicknameEditMode,
            emailEditMode,
        } = this.state;
        const { closeSettings } = this.props;

        return (
            <div className={Styles.container}>
                <p className={Styles.title}>Buff settings</p>
                <img src={close} alt="" className={Styles.closeButton} onClick={closeSettings} />
                <div className={Styles.nickname}>
                    <p>Nickname</p>
                    <input
                        name="nickname"
                        value={nickname}
                        onChange={this._handleInput}
                        disabled={!nicknameEditMode}
                    />
                </div>
                <div className={Styles.nicknameChange} onClick={this._toggleNicknameEditMode}>
                    {nicknameEditMode ? 'Save' : 'Change'}
                </div>
                <div className={Styles.email}>
                    <p>Email</p>
                    <input
                        name="email"
                        value={email}
                        onChange={this._handleInput}
                        disabled={!emailEditMode}
                    />
                </div>
                <div className={Styles.emailChange} onClick={this._toggleEmailEditMode}>
                    {emailEditMode ? 'Save' : 'Change'}
                </div>
                <div className={Styles.notifications}>
                    Notifications:<p>{checkedNotifications ? 'On' : 'Off'}</p>
                </div>
                <Switch
                    onChange={this._toggleCheckedNotifications}
                    checked={checkedNotifications}
                    onColor="#00753d"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={22}
                    width={44}
                    handleDiameter={20}
                    className={Styles.notificationsSwitch}
                />
                {/* <div className={Styles.autoLaunch}>
                    Auto launch:<p>{true ? 'On' : 'Off'}</p>
                </div>
                <Switch
                    onChange={this._toggleCheckedAutoLaunch}
                    checked={true}
                    onColor="#00753d"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={22}
                    width={44}
                    handleDiameter={20}
                    className={Styles.autoLaunchSwitch}
                /> */}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);
