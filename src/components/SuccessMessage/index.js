//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

//Styles
import Styles from './styles.module.scss';

//Instruments
import gsap from 'gsap';

export default class SuccessMessage extends Component {
    _animateEnteringComponent = (node) => {
        gsap.fromTo(
            node,
            0.2,
            {
                opacity: 0,
            },
            {
                opacity: 1,
            },
        );
    };

    render() {
        const { onClick } = this.props;

        return (
            <Transition
                in
                appear
                mountOnEnter
                timeout={200}
                onEnter={this._animateEnteringComponent}
            >
                <div className={Styles.background}>
                    <div className={Styles.container}>
                        <p>
                            Congratulations! Your registration was successfull
                        </p>
                        <p className={Styles.text}>
                            There's only one step to do - please, check your
                            email inbox and verify your email. After that you'll
                            be able start using Buff.
                        </p>
                        <button onClick={onClick}>Got it!</button>
                    </div>
                </div>
            </Transition>
        );
    }
}
