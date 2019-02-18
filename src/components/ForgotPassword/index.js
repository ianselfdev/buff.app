//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../theme/assets/logo.png';
import gsap from 'gsap';

class ForgotPassword extends Component {
    state = {
        email: '',
        code: '',
        newPassword: '',
        confNewPassword: '',
        page: 1,
    };

    _handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    _nextPage = (e) => {
        e.preventDefault();

        const { email, code, newPassword } = this.state;
        const { _closeForgotPassword } = this.props;

        this.setState((prevState) => {
            switch (prevState.page) {
                case 1:
                    console.log('sending an email');
                    console.log(email);
                    return {
                        page: 2,
                    };
                    break;
                case 4:
                    console.log('sending req with email, pass and code');
                    console.log(email);
                    console.log(code);
                    console.log(newPassword);
                    console.log('showing success sign and returning back to login page');
                    _closeForgotPassword();
                    return {
                        email: '',
                        code: '',
                        newPassword: '',
                        confNewPassword: '',
                        page: 1,
                    };
                    break;
                default:
                    return {
                        page: ++prevState.page,
                    };
            }
        });
    };

    //* Animation group
    _animateEnteringComponent = (node) => {
        gsap.fromTo(
            node,
            0.1,
            {
                opacity: 0,
            },
            {
                opacity: 1,
            },
        );
    };

    _animateExitingComponent = (node) => {
        gsap.fromTo(
            node,
            0.1,
            {
                opacity: 1,
            },
            {
                opacity: 0,
            },
        );
    };

    render() {
        const { email, page, code, newPassword, confNewPassword } = this.state;
        const { _closeForgotPassword } = this.props;

        const inputFields =
            page === 1
                ? [
                      {
                          value: email,
                          onChange: this._handleInput,
                          name: 'email',
                          type: 'email',
                          label: 'Email',
                          placeholder: 'Enter your email here',
                      },
                  ]
                : page === 2
                ? [
                      {
                          value: code,
                          onChange: this._handleInput,
                          name: 'code',
                          type: 'code',
                          label: 'Code',
                          placeholder: 'Enter code here',
                      },
                  ]
                : page === 3
                ? [
                      {
                          value: newPassword,
                          onChange: this._handleInput,
                          name: 'newPassword',
                          type: 'newPassword',
                          label: 'New password',
                          placeholder: 'Enter new password here',
                      },
                  ]
                : [
                      {
                          value: confNewPassword,
                          onChange: this._handleInput,
                          name: 'confNewPassword',
                          type: 'confNewPassword',
                          label: 'Confirm password',
                          placeholder: 'Confirm your new password',
                      },
                  ];

        return (
            <Transition
                in
                appear
                mountOnEnter
                timeout={100}
                onEnter={this._animateEnteringComponent}
                onExit={this._animateExitingComponent}
            >
                <div className={Styles.container}>
                    <div className={Styles.header}>
                        <img className={Styles.img} src={logo} alt="buff-logo" />
                        <p>Password recovery</p>
                    </div>
                    <form onSubmit={this._handleRegistration} className={Styles.form}>
                        {inputFields.map((item, index) => (
                            <LabeledInput
                                value={item.value}
                                onChange={item.onChange}
                                placeholder={item.placeholder}
                                name={item.name}
                                type={item.type}
                                label={item.label}
                                key={index}
                            />
                        ))}
                    </form>
                    <button
                        className={Styles.submitButton}
                        // disabled={!isValidEmail}
                        onClick={this._nextPage}
                    >
                        Next
                    </button>
                    <button className={Styles.backToLoginButton} onClick={_closeForgotPassword}>
                        Back To Login
                    </button>
                </div>
            </Transition>
        );
    }
}

export default connect(
    null,
    null,
)(ForgotPassword);
