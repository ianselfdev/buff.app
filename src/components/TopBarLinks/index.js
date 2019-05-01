//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class TopBarLinks extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <a className={Styles.link} href="https://buff.game" alt="">
                    FAQ
                </a>
                <a className={Styles.link} href="https://buff.game" alt="">
                    Report a bug
                </a>
                <a className={Styles.link} href="https://buff.game" alt="">
                    Contact us
                </a>
            </div>
        );
    }
}
