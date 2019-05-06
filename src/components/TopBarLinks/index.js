//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class TopBarLinks extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <a
                    className={Styles.link}
                    href="https://buff.game/faq/"
                    alt=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    FAQ
                </a>
                <a
                    className={Styles.link}
                    href="https://forms.gle/M9if7dJ2AnqGFjdaA"
                    alt=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Report a bug
                </a>
                <a
                    className={Styles.link}
                    href="https://buff.game/contact-us/"
                    alt=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Contact us
                </a>
            </div>
        );
    }
}
