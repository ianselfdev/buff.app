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
import { Analytics } from '../../analytics';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    signupAsync: authActions.signupAsync,
};

class Registration extends Component {
    state = {
        login: '',
        confPassword: '',
        confEmail: '',
        email: '',
        password: '',
        referral: '',
    };

    componentDidMount = () => {
        Analytics.userStartsSignUp();
    };

    _handleInput = (e) => {
        const { name, value } = e.target;

        //* Checking if nicknames and logins are correct
        if ((name === 'firstName' || name === 'lastName') && !/^[a-zA-Z\s]*$/.test(value)) {
            console.log(`wrong characters at '${name}' field`);
            return null;
        }

        this.setState({
            [name]: value,
        });
    };

    _handleRegistration = async (e) => {
        e.preventDefault();

        const { login, email, password, referral } = this.state;
        const { signupAsync } = this.props;

        //not sending referral if the field is empty
        if (referral.length > 0) {
            signupAsync({ login, email, password, referral });
            Analytics.userFinishesSignUp({ email, login });
        } else {
            signupAsync({ login, email, password });
            Analytics.userFinishesSignUp({ email, login, referral });
        }
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
        const { _closeRegistration } = this.props;

        const { login, email, password, confEmail, confPassword, referral } = this.state;

        const inputsValid =
            login.length >= 6 &&
            login.length <= 18 &&
            email === confEmail &&
            ((referral.length >= 7 && referral.length <= 14) || referral.length === 0) &&
            password === confPassword &&
            email.length > 0 &&
            password.length > 6 &&
            confEmail.length > 0 &&
            confPassword.length > 0;

        const inputFields = [
            {
                value: login,
                onChange: this._handleInput,
                name: 'login',
                type: 'text',
                label: 'Username *',
                isValid: (login.length >= 6 && login.length <= 18) || login.length === 0,
            },
            {
                value: email,
                onChange: this._handleInput,
                name: 'email',
                type: 'email',
                label: 'Email *',
                isValid: email.includes('@') || email.length === 0,
            },
            {
                value: confEmail,
                onChange: this._handleInput,
                name: 'confEmail',
                type: 'email',
                label: 'Confirm email *',
                isValid: email === confEmail || confEmail.length === 0,
            },
            {
                value: password,
                onChange: this._handleInput,
                name: 'password',
                type: 'password',
                label: 'Password *',
                isValid: password.length > 6 || password.length === 0,
            },
            {
                value: confPassword,
                onChange: this._handleInput,
                name: 'confPassword',
                type: 'password',
                label: 'Confirm password *',
                isValid: confPassword === password || confPassword.length === 0,
            },
            {
                value: referral,
                onChange: this._handleInput,
                name: 'referral',
                type: 'text',
                label: 'Invitation code (optional)',
                isValid: (referral.length >= 7 && referral.length <= 14) || referral.length === 0,
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
                    <p className={Styles.title}>
                        <img src={arrow} alt="back to login" onClick={_closeRegistration} />
                        Sign up
                    </p>
                    {inputFields.map((item, index) => (
                        <LabeledInput
                            value={item.value}
                            onChange={item.onChange}
                            placeholder={item.placeholder}
                            name={item.name}
                            type={item.type}
                            label={item.label}
                            isValid={item.isValid}
                            key={index}
                        />
                    ))}
                    <button
                        className={Styles.button}
                        onClick={this._handleRegistration}
                        disabled={!inputsValid}
                    >
                        Sign up
                    </button>
                    <p className={Styles.termsAndConditions}>
                        By clicking "Sign Up" button, you agree to our&nbsp;
                        <a href="https://buff.game/website-terms-of-use/" rel="noreferrer noopener">
                            Terms and Conditions
                        </a>
                    </p>
                </div>
            </Transition>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Registration);
