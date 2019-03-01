//Core
import React, { Component } from 'react';

//Components
import Registration from '../Registration';
import Login from '../Login';
import PasswordRecovery from '../PasswordRecovery';

//Styles
import Styles from './styles.module.scss';

export default class Startup extends Component {
    state = {
        registration: false,
        passwordRecovery: false,
    };

    _toggleRegistration = () => {
        this.setState((prevState) => ({
            registration: !prevState.registration,
        }));
    };

    _togglePasswordRecovery = () => {
        this.setState((prevState) => ({
            passwordRecovery: !prevState.passwordRecovery,
        }));
    };

    render() {
        const { registration, passwordRecovery } = this.state;
        return (
            <div
                className={
                    registration
                        ? Styles.containerRegistration
                        : passwordRecovery
                        ? Styles.containerPasswordRecovery
                        : Styles.container
                }
            >
                {registration ? (
                    <Registration _closeRegistration={this._toggleRegistration} />
                ) : passwordRecovery ? (
                    <PasswordRecovery _closePasswordRecovery={this._togglePasswordRecovery} />
                ) : (
                    <Login
                        _toggleRegistration={this._toggleRegistration}
                        _togglePasswordRecovery={this._togglePasswordRecovery}
                    />
                )}
            </div>
        );
    }
}
