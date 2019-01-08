//Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import * as mainActions from '../../actions/mainActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

class Login extends Component {
    state = {
        status: {},
        login: '',
        password: '',
        errorMessage: '',
        registration: false,
        redirectToReferrer: false,
        isLoading: false,
        rememberMe: false,
    };

    componentDidMount = async () => {
        const { onLogin, receiveTokens } = this.props;
        const localStorage = window.localStorage;
        const login = localStorage.getItem('buff-login');
        const password = localStorage.getItem('buff-password');
        let response = null;

        if (!login || !password) {
            return false;
        }

        try {
            //rendering Spinner
            this.setState({
                isLoading: true,
            });

            //checkinh if login is email
            if (login.includes('@')) {
                //sending API request to get tokens
                response = await Api.postLogin({
                    email: login,
                    password,
                });
                if (!response.success) {
                    throw new Error(response.error);
                }
            } else {
                //sending API request to get tokens
                response = await Api.postLogin({
                    login,
                    password,
                });
                if (!response.success) {
                    throw new Error(response.error);
                }
            }

            receiveTokens(response.tokens);

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

    _handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    _toggleRememberMe = () => {
        this.setState((prevState) => ({
            rememberMe: !prevState.rememberMe,
        }));
    };

    _handleLogin = async () => {
        const { login, password, rememberMe } = this.state;
        const { onLogin, receiveTokens } = this.props;
        const localStorage = window.localStorage;
        let response = null;

        try {
            //rendering Spinner
            this.setState({
                isLoading: true,
            });

            //checkinh if login is email
            if (login.includes('@')) {
                //sending API request to get tokens
                response = await Api.postLogin({
                    email: login,
                    password,
                });
                if (!response.success) {
                    throw new Error(response.error);
                }
            } else {
                //sending API request to get tokens
                response = await Api.postLogin({
                    login,
                    password,
                });
                if (!response.success) {
                    throw new Error(response.error);
                }
            }

            //remembering user if needed
            if (rememberMe) {
                localStorage.setItem('buff-login', login);
                localStorage.setItem('buff-password', password);
            }

            receiveTokens(response.tokens);

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
            rememberMe,
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
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={this._toggleRememberMe}
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

const mapStateToProps = (state) => ({
    tokens: state.reducerMain.tokens,
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
