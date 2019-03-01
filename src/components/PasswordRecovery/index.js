//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';
import ErrorResetPasswordLabel from '../_popups/passwordReset/Error';
import SuccessResetPasswordLabel from '../_popups/passwordReset/Success';
import Hint from '../_popups/passwordReset/Hint';

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

class PasswordRecovery extends Component {
    state = {
        email: '',
        code: '',
        newPassword: '',
        confNewPassword: '',
        page: 1,
        hint: false,
    };

    _handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value.trim(),
        });
    };

    _resetPage = () => {
        this.setState({
            code: '',
            newPassword: '',
            confNewPassword: '',
            page: 1,
            hint: false,
        });
    };

    _toggleHint = () => {
        this.setState((prevState) => ({
            hint: !prevState.hint,
        }));
    };

    _nextPage = (e) => {
        e.preventDefault();

        const { email, code, newPassword, page } = this.state;
        const { getPasswordResetCodeAsync, resetPasswordAsync } = this.props;

        //refuse proceeding if password is not valid
        if ((page === 3 && newPassword.length < 6) || (page === 2 && code.length < 36)) {
            return null;
        }

        this.setState((prevState) => {
            switch (prevState.page) {
                case 1:
                    getPasswordResetCodeAsync(email);
                    this._toggleHint();
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
        const { email, page, code, newPassword, confNewPassword, hint } = this.state;
        const {
            _closePasswordRecovery,
            successResetPasswordLabel,
            errorResetPasswordLabel,
            errorResetPasswordMessage,
        } = this.props;

        //rendering fields
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

        // validating inputs
        const isValid =
            page === 1
                ? email.includes('@')
                    ? true
                    : false
                : page === 2
                ? code.length >= 36
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
                        <button
                            className={Styles.backToLoginButton}
                            onClick={_closePasswordRecovery}
                        >
                            Back To Login
                        </button>
                    </div>
                </Transition>
                {errorResetPasswordLabel && (
                    <ErrorResetPasswordLabel
                        message={errorResetPasswordMessage}
                        resetPage={this._resetPage}
                    />
                )}
                {successResetPasswordLabel && (
                    <SuccessResetPasswordLabel closeModal={_closePasswordRecovery} />
                )}
                {hint && <Hint closeModal={this._toggleHint} />}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PasswordRecovery);
