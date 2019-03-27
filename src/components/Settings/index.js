//Core
import React, { Component } from 'react';

//Instruments
import Switch from 'react-switch';
import { notifications } from '../_notifications';
import close from '../../theme/svg/close.svg';

//Styles
import Styles from './styles.module.scss';

export default class Settings extends Component {
    state = {
        checkedNotifications: false,
        checkedAutoLaunch: false,
        nicknameEditMode: false,
        emailEditMode: false,
        nickname: 'testNickname',
        email: 'email',
    };

    _toggleCheckedNotifications = () => {
        this.setState((prevState) => ({
            checkedNotifications: !prevState.checkedNotifications,
        }));
    };

    _toggleCheckedAutoLaunch = () => {
        this.setState((prevState) => ({
            checkedAutoLaunch: !prevState.checkedAutoLaunch,
        }));
    };

    _toggleNicknameEditMode = () => {
        this.setState((prevState) => ({
            nicknameEditMode: !prevState.nicknameEditMode,
        }));
    };

    _toggleEmailEditMode = () => {
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
            checkedAutoLaunch,
            nickname,
            email,
            nicknameEditMode,
            emailEditMode,
        } = this.state;

        return (
            <div className={Styles.container}>
                <p className={Styles.title}>Buff settings</p>
                <img src={close} alt="" className={Styles.closeButton} />
                <div className={Styles.nickname}>
                    <p>Nickname</p>
                    <input
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
                    <input value={email} onChange={this._handleInput} disabled={!emailEditMode} />
                </div>
                <div className={Styles.emailChange} onClick={this._toggleEmailEditMode}>
                    {emailEditMode ? 'Save' : 'Change'}
                </div>
                <div className={Styles.notifications}>
                    Test notifications:<p>{checkedNotifications ? 'On' : 'Off'}</p>
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
                <div className={Styles.autoLaunch}>
                    Auto launch:<p>{checkedAutoLaunch ? 'On' : 'Off'}</p>
                </div>
                <Switch
                    onChange={this._toggleCheckedAutoLaunch}
                    checked={checkedAutoLaunch}
                    onColor="#00753d"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={22}
                    width={44}
                    handleDiameter={20}
                    className={Styles.autoLaunchSwitch}
                />
            </div>
        );
    }
}
