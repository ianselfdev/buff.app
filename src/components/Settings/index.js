//Core
import React, { Component } from 'react';

//Instruments
import Switch from 'react-switch';
import { notifications } from '../_notifications';

//Styles
import Styles from './styles.module.scss';

export default class Settings extends Component {
    state = {
        checkedNotifications: false,
        checkedAutoLaunch: false,
        nickname: 'testNickname',
        email: 'email',
    };

    _toggleCheckedNotifications = () => {
        notifications.error('ERROR');
        notifications.warning('WARNING');
        notifications.success('SUCCESS');
        notifications.info('INFO');
        this.setState((prevState) => ({
            checkedNotifications: !prevState.checkedNotifications,
        }));
    };

    _toggleCheckedAutoLaunch = () => {
        this.setState((prevState) => ({
            checkedAutoLaunch: !prevState.checkedAutoLaunch,
        }));
    };

    _handleInput = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const { checkedNotifications, checkedAutoLaunch, nickname, email } = this.state;

        return (
            <div className={Styles.settingsContainer}>
                <p className={Styles.title}>Buff settings:</p>
                <div className={Styles.inputsBlock}>
                    <span>Nickname</span>
                    <input value={nickname} name="nickname" onChange={this._handleInput} />
                    <button>Change</button>
                </div>
                <div className={Styles.inputsBlock}>
                    <span>Email</span>
                    <input value={email} name="email" onChange={this._handleInput} />
                    <button>Change</button>
                </div>
                <div className={Styles.toggleBlock}>
                    <span id="switchLabel" className={Styles.switchLabel}>
                        Test notifications
                    </span>
                    <Switch
                        onChange={this._toggleCheckedNotifications}
                        checked={checkedNotifications}
                        onColor="#00753d"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={22}
                        width={44}
                        handleDiameter={20}
                        ariaLabelledby="switchLabel"
                    />
                </div>
                <div className={Styles.toggleBlock}>
                    <span id="switchLabel" className={Styles.switchLabel}>
                        Auto launch
                    </span>
                    <Switch
                        onChange={this._toggleCheckedAutoLaunch}
                        checked={checkedAutoLaunch}
                        onColor="#00753d"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={22}
                        width={44}
                        handleDiameter={20}
                        ariaLabelledby="switchLabel"
                    />
                </div>
            </div>
        );
    }
}
