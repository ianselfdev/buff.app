//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class Success extends Component {
    render() {
        return (
            <div className={Styles.bg}>
                <div className={Styles.container}>
                    <p>Your purchase was successful!</p>
                </div>
            </div>
        );
    }
}
