//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';
import ErrorResetPasswordLabel from '../_popups/passwordReset/Error';
import SuccessResetPasswordLabel from '../_popups/passwordReset/Success';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../theme/assets/logo.png';
import gsap from 'gsap';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => {
    return {
        successResetPasswordLabel: state.ui.get('successResetPasswordLabel'),
        errorResetPasswordLabel: state.ui.get('errorResetPasswordLabel'),
        errorResetPasswordMessage: state.ui.get('errorResetPasswordMessage'),
    };
};

const mapDispatchToProps = {
    getPasswordResetCodeAsync: authActions.getPasswordResetCodeAsync,
    resetPasswordAsync: authActions.resetPasswordAsync,
};

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
        const { getPasswordResetCodeAsync, resetPasswordAsync } = this.props;

        this.setState((prevState) => {
            switch (prevState.page) {
                case 1:
                    getPasswordResetCodeAsync(email);
                    return {
                        page: 2,
                    };
                case 4:
                    resetPasswordAsync(email, newPassword, code);
                    return {
                        email: '',
                        code: '',
                        newPassword: '',
                        confNewPassword: '',
                        page: 1,
                    };
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
        const {
            _closeForgotPassword,
            successResetPasswordLabel,
            errorResetPasswordLabel,
            errorResetPasswordMessage,
        } = this.props;

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
                          type: 'text',
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
                          type: 'password',
                          label: 'New password',
                          placeholder: 'Enter new password here',
                      },
                  ]
                : [
                      {
                          value: confNewPassword,
                          onChange: this._handleInput,
                          name: 'confNewPassword',
                          type: 'password',
                          label: 'Confirm password',
                          placeholder: 'Confirm your new password',
                      },
                  ];

        const isValid =
            page === 1
                ? email.includes('@')
                    ? true
                    : false
                : page === 2
                ? code.length > 0
                    ? true
                    : false
                : page === 3
                ? newPassword.length > 6
                    ? true
                    : false
                : page === 4
                ? confNewPassword === newPassword
                : false;

        return (
            <>
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
                        <form className={Styles.form} onSubmit={this._nextPage}>
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
                            disabled={!isValid}
                            onClick={this._nextPage}
                        >
                            Next
                        </button>
                        <button className={Styles.backToLoginButton} onClick={_closeForgotPassword}>
                            Back To Login
                        </button>
                    </div>
                </Transition>
                {errorResetPasswordLabel && (
                    <ErrorResetPasswordLabel message={errorResetPasswordMessage} />
                )}
                {successResetPasswordLabel && (
                    <SuccessResetPasswordLabel closeModal={_closeForgotPassword} />
                )}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotPassword);
