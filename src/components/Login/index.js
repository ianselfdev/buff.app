//Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';

//Components
import Spinner from '../Spinner';
import ErrorLabel from '../ErrorLabel';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../assets/logo.png';
import { realAuth } from '../../routes';
import gsap from 'gsap';

//REST
import Api from '../../Store/ApiRequests';

export default class Registration extends Component {
    state = {
        status: {},
        login: '',
        password: '',
        registration: false,
        redirectToReferrer: false,
        isLoading: false,
        errorMessage: '',
    };

    _handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    _handleLogin = async () => {
        const { login, password } = this.state;
        const { onLogin } = this.props;

        try {
            //rendering Spinner
            this.setState({
                isLoading: true,
            });

            //sending API request to get tokens
            const response = await Api.postLogin({
                email: login,
                password,
            });
            if (!response.success) {
                throw new Error(response.error);
            }

            //sending tokens to get user info
            const user = await Api.getCurrentUser(response.tokens.token);

            //logging user into application
            await realAuth.authenticate(user.data);
            onLogin({ ...user.data.account, ...response.tokens });

            this.setState({
                redirectToReferrer: response.success,
                status: response,
                isLoading: false,
                login: '',
                password: '',
            });
        } catch (error) {
            console.error('Login errorr: ', error);

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

    //*animation group
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
        const {
            redirectToReferrer,
            login,
            password,
            errorMessage,
        } = this.state;
        const { _toggleRegistration } = this.props;

        const from = {
            from: { pathname: '/' },
        };

        if (this.state.isLoading) {
            return <Spinner />;
        } else if (redirectToReferrer && from.pathname !== '/') {
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
                <div>
                    {errorMessage.length > 0 && (
                        <ErrorLabel message={errorMessage} />
                    )}
                    <img className={Styles.img} src={logo} alt="buff-logo" />
                    <form
                        className={Styles.loginForm}
                        onSubmit={this._handleLogin}
                    >
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
                        onClick={_toggleRegistration}
                        className={Styles.registrationButton}
                    >
                        Not registered yet? Click here!
                    </button>
                </div>
            </Transition>
        );
    }
}
