//Core
import React, { Component } from 'react';
import { realAuth } from '../../routes';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';

//Styles
import Styles from './styles.module.scss';

//Analytics
import ReactGA from 'react-ga';

//Instruments
import gsap from 'gsap';
import logo from '../../assets/logo.png';
import Registration from '../Registration';
import Spinner from '../Spinner';

export default class Login extends Component {
    state = {
        status: {
            status: null,
            data: null,
        },
        login: '',
        password: '',
        registration: false,
        redirectToReferrer: false,
        isLoading: false,
    };

    _handleLogin = async () => {
        const { login, password } = this.state;

        this.setState({ isLoading: true });
        if (!realAuth.isAuthenticated) {
            realAuth
                .authenticate({
                    login,
                    password,
                })
                .then((isAuthenticated) => {
                    this.setState({
                        redirectToReferrer: isAuthenticated.status,
                        status: isAuthenticated,
                        isLoading: false,
                        login: '',
                        password: '',
                    });

                    ReactGA.event({
                        category: 'authentication',
                        action: 'Login',
                    });

                    console.log('Logged in successfully');
                    this.props.onLogin(isAuthenticated);
                })
                .catch((error) => {
                    console.log('Error::Login => ', error);
                });
        }
    };

    _toggleRegistration = () => {
        this.setState((prevState) => ({
            registration: !prevState.registration,
        }));
    };

    _handleInput = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value,
        });
    };

    handleForgotPassword = () => {
        this.setState({
            open: true,
        });
    };

    handleCloseForgotPassword = () => {
        this.setState({
            open: false,
        });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    };

    //Animation group
    _animateEnter = (component) => {
        gsap.fromTo(
            component,
            0.5,
            {
                y: 800,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
            },
        );
    };

    _animateExit = (component) => {
        gsap.fromTo(
            component,
            0.5,
            {
                y: 0,
                opacity: 1,
            },
            {
                y: 800,
                opacity: 0,
            },
        );
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: '/' },
        };
        const {
            redirectToReferrer,
            login,
            password,
            registration,
        } = this.state;

        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (redirectToReferrer && from.pathname !== '/') {
            return <Redirect to={from} />;
        }
        return (
            <div className={Styles.container} onKeyPress={this.onKeyPress}>
                <img src={logo} alt="buff-logo" />
                <form className={Styles.loginForm} onSubmit={this._handleLogin}>
                    <input
                        type="text"
                        name="login"
                        placeholder="Login or Email"
                        value={login}
                        onChange={this._handleInput}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this._handleInput}
                    />
                    <input type="submit" value="Log In" />
                </form>
                <button
                    onClick={() => {
                        console.log('lol');
                    }}
                    className={Styles.forgotPassButton}
                >
                    Forgot password?
                </button>
                <button
                    onClick={this._toggleRegistration}
                    className={Styles.registrationButton}
                >
                    Not registered yet? Click here!
                </button>
                <Transition
                    mountOnEnter
                    in={registration}
                    timeout={500}
                    onEnter={this._animateEnter}
                    onExit={this._animateExit}
                >
                    <Registration
                        _closeRegistration={this._toggleRegistration}
                    />
                </Transition>
            </div>
        );
    }
}
