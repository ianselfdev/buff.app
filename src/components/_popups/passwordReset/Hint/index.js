//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class Hint extends Component {
    render() {
        const { closeModal } = this.props;
        return (
            <div className={Styles.bg}>
                <div className={Styles.container}>
                    <p>Check your email for the recovery code and paste it into the next window</p>
                    <button onClick={closeModal}>Proceed</button>
                </div>
            </div>
        );
    }
}
