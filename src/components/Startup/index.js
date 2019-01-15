//Core
import React, { Component } from 'react';

//Components
import Registration from '../Registration';
import Login from '../Login';
import Spinner from '../Spinner';

//Styles
import Styles from './styles.module.scss';

export default class Startup extends Component {
    state = {
        registration: false,
    };

    _toggleRegistration = () => {
        this.setState((prevState) => ({
            registration: !prevState.registration,
        }));
    };

    render() {
        const { registration } = this.state;
        return (
            <div className={registration ? Styles.containerRegistration : Styles.container}>
                {registration ? (
                    <Registration _closeRegistration={this._toggleRegistration} />
                ) : (
                    <Login _toggleRegistration={this._toggleRegistration} />
                )}
            </div>
        );
    }
}
