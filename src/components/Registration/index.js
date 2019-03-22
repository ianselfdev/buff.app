//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';
import ErrorLabel from '../ErrorLabel';
import SuccessMessage from '../SuccessMessage';

//Styles
import Styles from './styles.module.scss';

//Instruments
import arrow from '../../theme/svg/arrow-left.svg';
import gsap from 'gsap';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => ({
    registrationSuccess: state.auth.get('registrationSuccessful'),
    errorMessage: state.ui.get('errorMessage'),
});

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

        signupAsync({ login, email, password, referral });
    };

    _gotIt = () => {
        const { _closeRegistration } = this.props;

        this.setState({
            login: '',
            confPassword: '',
            confEmail: '',
            email: '',
            password: '',
            errorMessage: '',
            referral: '',
        });

        _closeRegistration();
    };

    //* Animation group
    _animateEnterWarning = (node) => {
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

    _animateExitWarning = (node) => {
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
        const { _closeRegistration, registrationSuccess, errorMessage } = this.props;

        const { login, email, password, confEmail, confPassword, referral } = this.state;

        const validation =
            login.length >= 6 &&
            login.length <= 18 &&
            email === confEmail &&
            (referral.length === 36 || referral.length === 0) &&
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
                label: 'Login',
            },
            {
                value: email,
                onChange: this._handleInput,
                name: 'email',
                type: 'email',
                label: 'Email',
            },
            {
                value: confEmail,
                onChange: this._handleInput,
                name: 'confEmail',
                type: 'email',
                label: 'Confirm email',
            },
            {
                value: password,
                onChange: this._handleInput,
                name: 'password',
                type: 'password',
                label: 'Password',
            },
            {
                value: confPassword,
                onChange: this._handleInput,
                name: 'confPassword',
                type: 'password',
                label: 'Confirm password',
            },
            {
                value: referral,
                onChange: this._handleInput,
                name: 'referral',
                type: 'text',
                label: 'Invitation code',
            },
        ];

        return (
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
                        key={index}
                    />
                ))}
                <button className={Styles.button}>Sign up</button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Registration);
