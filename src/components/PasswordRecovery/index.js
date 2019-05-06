//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';

//Styles
import Styles from './styles.module.scss';

//Instruments
import arrow from '../../theme/svg/arrow-left.svg';
import gsap from 'gsap';
import Move from 'react-flip-move';
import { notifications } from '../_notifications';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => {
    return {
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
        });
    };

    _nextPage = (e) => {
        e.preventDefault();

        const { email, code, newPassword, page } = this.state;
        const {
            getPasswordResetCodeAsync,
            resetPasswordAsync,
            _closePasswordRecovery,
        } = this.props;

        //refuse proceeding if password is not valid
        if ((page === 3 && newPassword.length < 6) || (page === 2 && code.length < 36)) {
            return null;
        }

        this.setState((prevState) => {
            switch (prevState.page) {
                case 1:
                    getPasswordResetCodeAsync(email);
                    return {
                        page: 2,
                    };
                case 2:
                    resetPasswordAsync(email, newPassword, code);
                    setTimeout(() => {
                        const { errorResetPasswordMessage } = this.props;
                        if (errorResetPasswordMessage) {
                            notifications.error(errorResetPasswordMessage);
                        } else {
                            notifications.success('Password was reset successfully!');
                            _closePasswordRecovery();
                        }
                        return {
                            email: '',
                            code: '',
                            newPassword: '',
                            confNewPassword: '',
                            page: 1,
                        };
                    }, 500);
                    break;
                default:
                    return prevState;
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
        const { _closePasswordRecovery } = this.props;

        const inputFields = [
            {
                value: email,
                onChange: this._handleInput,
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your email here',
            },
            {
                value: code,
                onChange: this._handleInput,
                name: 'code',
                type: 'text',
                label: 'Code',
                placeholder: 'Enter code here',
            },
            {
                value: newPassword,
                onChange: this._handleInput,
                name: 'newPassword',
                type: 'password',
                label: 'New password',
                placeholder: 'Enter new password here',
            },
            {
                value: confNewPassword,
                onChange: this._handleInput,
                name: 'confNewPassword',
                type: 'password',
                label: 'Confirm password',
                placeholder: 'Confirm your new password',
            },
        ];

        const inputValid =
            page === 1
                ? email.includes('@')
                : code.length >= 36 && newPassword.length > 6 && newPassword === confNewPassword;

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
                        <p className={Styles.title}>
                            <img src={arrow} alt="back to login" onClick={_closePasswordRecovery} />
                            Password recovery
                        </p>
                        <div className={Styles.form}>
                            {page === 1 ? (
                                <p>
                                    Enter your email below.
                                    <br />
                                    You will recieve a confirmation code.
                                </p>
                            ) : (
                                <p>
                                    Paste your code in the field below and enter a new password.
                                    <br />
                                    Mind that password should be a least 7 characters long!
                                </p>
                            )}

                            <Move enterAnimation="fade" leaveAnimation="fade">
                                {page === 1
                                    ? inputFields
                                          .slice(0, 1)
                                          .map((item, index) => (
                                              <LabeledInput
                                                  value={item.value}
                                                  onChange={item.onChange}
                                                  placeholder={item.placeholder}
                                                  name={item.name}
                                                  type={item.type}
                                                  label={item.label}
                                                  key={index}
                                              />
                                          ))
                                    : inputFields
                                          .slice(1)
                                          .map((item, index) => (
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
                            </Move>
                        </div>
                        <button
                            onClick={this._nextPage}
                            className={Styles.button}
                            disabled={!inputValid}
                        >
                            {page === 1 ? 'Send code' : 'Change password'}
                        </button>
                    </div>
                </Transition>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PasswordRecovery);
