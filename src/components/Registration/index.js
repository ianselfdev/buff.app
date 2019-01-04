//Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';

//Components
import Spinner from '../Spinner';
import LabeledInput from '../LabeledInput';
import ErrorLabel from '../ErrorLabel';
import SuccessMessage from '../SuccessMessage';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../assets/logo.png';
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
        errorMessage: '',
        registrationSuccess: false,
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
            //rendering Spinner
            this.setState({
                isLoading: true,
            });

            //sending API request to register
            const response = await Api.postRegister({
                login,
                email,
                password,
                nickname: login,
                firstName: 'testFirstName',
                lastName: 'testLastName',
            });
            if (!response.success) {
                throw new Error(response.error);
            } else {
                // clearing inputs and registrationSuccess state to render success message
                this.setState({
                    isLoading: false,
                    login: '',
                    confPassword: '',
                    confEmail: '',
                    email: '',
                    password: '',
                    errorMessage: '',
                    registrationSuccess: true,
                });
            }
        } catch (error) {
            console.error('Registration errorr: ', error);

            const { message: errorMessage } = error;

            //setting state to render ErrorLabel
            this.setState({
                errorMessage,
            });
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    };

    _gotIt = () => {
        const { _closeRegistration } = this.props;

        this.setState({
            isLoading: false,
            login: '',
            confPassword: '',
            confEmail: '',
            email: '',
            password: '',
            errorMessage: '',
            registrationSuccess: false,
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
            errorMessage,
            registrationSuccess,
        } = this.state;

        const validation =
            login.length >= 6 &&
            login.length <= 18 &&
            email === confEmail &&
            password === confPassword &&
            email.length > 0 &&
            password.length > 6 &&
            confEmail.length > 0 &&
            confPassword.length > 0;

        const warningSign =
            login.length > 0 &&
            email.length > 0 &&
            confEmail.length > 0 &&
            confPassword.length > 0
                ? login.length < 6 || login.length > 18
                    ? 'Login must be 6-18 characters long'
                    : email !== confEmail
                    ? 'Emails do not match'
                    : password !== confPassword
                    ? 'Passwords do not match'
                    : password.length < 6
                    ? 'Password must be more than 6 characters long'
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
            <Transition
                in
                appear
                mountOnEnter
                timeout={100}
                onEnter={this._animateEnteringComponent}
                onExit={this._animateExitingComponent}
            >
                <div className={Styles.container}>
                    {errorMessage.length > 0 && (
                        <ErrorLabel message={errorMessage} />
                    )}
                    {registrationSuccess && (
                        <SuccessMessage onClick={this._gotIt} />
                    )}
                    <img className={Styles.img} src={logo} alt="buff-logo" />
                    <form
                        onSubmit={this._handleRegistration}
                        className={Styles.form}
                    >
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
                        onEnter={this._animateEnterWarning}
                        onExit={this._animateExitWarning}
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
                </div>
            </Transition>
        );
    }
}
