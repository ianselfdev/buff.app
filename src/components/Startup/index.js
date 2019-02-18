//Core
import React, { Component } from 'react';

//Components
import Registration from '../Registration';
import Login from '../Login';
import ForgotPassword from '../ForgotPassword';

//Styles
import Styles from './styles.module.scss';

export default class Startup extends Component {
    state = {
        registration: false,
        forgotPassword: false,
    };

    _toggleRegistration = () => {
        this.setState((prevState) => ({
            registration: !prevState.registration,
        }));
    };

    _toggleForgotPassword = () => {
        this.setState((prevState) => ({
            forgotPassword: !prevState.forgotPassword,
        }));
    };

    render() {
        const { registration, forgotPassword } = this.state;
        return (
            <div
                className={
                    registration
                        ? Styles.containerRegistration
                        : forgotPassword
                        ? Styles.containerForgotPassword
                        : Styles.container
                }
            >
                {registration ? (
                    <Registration _closeRegistration={this._toggleRegistration} />
                ) : forgotPassword ? (
                    <ForgotPassword _closeForgotPassword={this._toggleForgotPassword} />
                ) : (
                    <Login
                        _toggleRegistration={this._toggleRegistration}
                        _toggleForgotPassword={this._toggleForgotPassword}
                    />
                )}
            </div>
        );
    }
}
