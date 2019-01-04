//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

//Styles
import Styles from './styles.module.scss';

//Instruments
import gsap from 'gsap';

export default class ErrorLabel extends Component {
    //*animation group
    _animateEnter = (node) => {
        gsap.fromTo(
            node,
            0.5,
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
            },
        );
    };

    _animateExit = (node) => {
        gsap.fromTo(
            node,
            0.5,
            {
                y: 0,
                opacity: 1,
            },
            {
                y: 100,
                opacity: 0,
            },
        );
    };

    render() {
        const { message } = this.props;

        return (
            <Transition
                in
                appear
                mountOnEnter
                timeout={500}
                onEnter={this._animateEnter}
                onExit={this._animateExit}
            >
                <div className={Styles.error}>
                    <p>
                        {message === 'Failed to fetch'
                            ? 'Check your internet connection'
                            : message}
                    </p>
                </div>
            </Transition>
        );
    }
}
