//Core
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../assets/logo.png';
import Spinner from '../Spinner';
import LabeledInput from '../LabeledInput';
import gsap from 'gsap';

//REST
import Api from '../../Store/ApiRequests';

export default class Registration extends Component {
    state = {
        isLoading: false,
        login: '',
        confPassword: '',
        confEmail: '',
        email: '',
        password: '',
    };

    _handleInput = (e) => {
        const { name, value } = e.target;

        //* Checking if nicknames and logins are correct
        if (
            (name === 'firstName' || name === 'lastName') &&
            !/^[a-zA-Z\s]*$/.test(value)
        ) {
            console.log(`wrong characters at '${name}' field`);
            return null;
        }

        this.setState({
            [name]: value,
        });
    };

    _handleRegistration = async (e) => {
        e.preventDefault();

        const { login, email, password } = this.state;

        try {
            this.setState({
                isLoading: true,
            });

            Api.postRegister({
                login,
                email,
                password,
                nickname: login,
                firstName: 'testFirstName',
                lastName: 'testLastName',
            });
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    };

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
        const from = {
            from: { pathname: '/' },
        };

        const { _closeRegistration } = this.props;

        const {
            redirectToReferrer,
            login,
            email,
            password,
            confEmail,
            confPassword,
        } = this.state;

        const validation =
            login.length >= 6 &&
            login.length <= 18 &&
            email === confEmail &&
            password === confPassword &&
            email.length > 0 &&
            password.length > 0 &&
            confEmail.length > 0 &&
            confPassword.length > 0;

        const warningSign =
            login.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            confEmail.length > 0 &&
            confPassword.length > 0
                ? login.length < 6 || login.length > 18
                    ? 'Login must be 6-18 characters long'
                    : email !== confEmail
                    ? 'Emails do not match'
                    : password !== confPassword
                    ? 'Passwords do not match'
                    : null
                : null;

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
        ];

        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (redirectToReferrer && from.pathname !== '/') {
            return <Redirect to={from} />;
        }

        return (
            <Fragment>
                <img className={Styles.img} src={logo} alt="buff-logo" />
                <Transition
                    appear
                    in
                    timeout={500}
                    onEnter={this._animateEnter}
                    onExit={this._animateExit}
                >
                <Fragment>
                <form onSubmit={this._handleRegistration}>
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
                <Transition
                    in={warningSign}
                    timeout={500}
                    onEnter={this._animateEnter}
                    onExit={this._animateExit}
                >
                    <p className={Styles.warning}>{warningSign}</p>
                </Transition>
                <button
                    disabled={!validation}
                    className={Styles.signUpButton}
                    onClick={this._handleRegistration}
                >
                    Sign Up
                </button>
                <button
                    className={Styles.backToLoginButton}
                    onClick={_closeRegistration}
                >
                    Back To Login
                </button>
                </Fragment>
                </Transition>
            </Fragment>
        );
    }
}
