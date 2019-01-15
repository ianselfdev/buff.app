//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class SuccessMessage extends Component {
    render() {
        const { onClick } = this.props;

        return (
            <div className={Styles.background}>
                <div className={Styles.container}>
                    <p>Congratulations! Your registration was successfull</p>
                    <p className={Styles.text}>
                        There's only one step to do — please, check your email inbox and verify your
                        email. After that you'll be able start using Buff.
                    </p>
                    <button onClick={onClick}>Got it!</button>
                </div>
            </div>
        );
    }
}
