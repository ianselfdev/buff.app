//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';

//Styles
import Styles from './styles.module.scss';

//Instruments
import google from '../../theme/svg/google.svg';
import discord from '../../theme/svg/discord.svg';
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
        const { signupAsync, closeRegistration } = this.props;

        //not sending referral if the field is empty
        if (referral.length > 0) {
            signupAsync({ login, email, password, referral });
            Analytics.userFinishesSignUp({ email, login });
        } else {
            signupAsync({ login, email, password });
            Analytics.userFinishesSignUp({ email, login, referral });
        }

        closeRegistration();
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
        const { closeRegistration } = this.props;

        const { login, email, password, confPassword, referral } = this.state;

        const inputsValid =
            login.length >= 6 &&
            login.length <= 18 &&
            ((referral.length >= 7 && referral.length <= 14) || referral.length === 0) &&
            password === confPassword &&
            email.length > 0 &&
            password.length > 6 &&
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
                    <div className={Styles.defaultSignUp}>
                        <p className={Styles.title}>
                            <img src={arrow} alt="back to login" onClick={closeRegistration} />
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
                                style={
                                    item.name === 'password'
                                        ? { width: '49%', marginRight: '1%' }
                                        : item.name === 'confPassword'
                                        ? { width: '49%', marginLeft: '1%' }
                                        : {}
                                }
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
                            <a
                                href="https://buff.game/website-terms-of-use/"
                                rel="noreferrer noopener"
                                target="_blank"
                            >
                                Terms and Conditions
                            </a>
                        </p>
                    </div>
                    <div className={Styles.socialSignUp}>
                        <div className={Styles.title}>
                            <p>Or sign up with socials</p>
                        </div>
                        <a
                            href="http://18.188.224.32:6002/api/accounts/login/google"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={`${Styles.button} ${Styles.google}`}>
                                <img src={google} alt="" />
                                Sign up with Google
                            </div>
                        </a>
                        <a
                            href="http://18.188.224.32:6002/api/accounts/login/discord"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={`${Styles.button} ${Styles.discord}`}>
                                <img src={discord} alt="" />
                                Sign up with Discord
                            </div>
                        </a>
                    </div>
                </div>
            </Transition>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Registration);
