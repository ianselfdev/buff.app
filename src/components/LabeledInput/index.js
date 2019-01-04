//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

//Styles
import Styles from './styles.module.scss';

//Instruments
import gsap from 'gsap';

export default class LabeledInput extends Component {
    //Animation group
    _animateEnter = (node) => {
        gsap.fromTo(
            node,
            0.5,
            {
                y: -10,
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
                y: -10,
                opacity: 0,
            },
        );
    };

    render() {
        const { value, onChange, placeholder, name, type, label } = this.props;

        return (
            <div className={Styles.div}>
                <Transition
                    in={value.length > 0}
                    timeout={500}
                    onEnter={this._animateEnter}
                    onExit={this._animateExit}
                >
                    <span
                        style={{
                            opacity: 0,
                        }}
                        className={Styles.span}
                    >
                        {label}
                    </span>
                </Transition>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder || label}
                    onChange={onChange}
                    value={value}
                    className={Styles.input}
                />
            </div>
        );
    }
}