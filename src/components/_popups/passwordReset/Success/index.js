//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class SuccessResetPasswordLabel extends Component {
    render() {
        const { closeModal } = this.props;

        return (
            <div className={Styles.bg}>
                <div className={Styles.container}>
                    <p>Password change was successful!</p>
                    <button onClick={closeModal}>Back to login</button>
                </div>
            </div>
        );
    }
}
