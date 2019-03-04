//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

//Components
import ErrorLabel from '../ErrorLabel';

//Styles
import Styles from './styles.module.scss';

//Instruments
import discordLogoWhite from '../../theme/assets/Discord-Logo-White.png';
import logo from '../../theme/assets/logo.png';
import gsap from 'gsap';
import queryString from 'query-string';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => ({
    errorMessage: state.ui.get('errorMessage'),
});

const mapDispatchToProps = {
    loginAsync: authActions.loginAsync,
    loginDemo: authActions.loginDemo,
    loginWithTokenAsync: authActions.loginWithTokenAsync,
};

class Login extends Component {
    state = {
        status: {},
        login: '',
        password: '',
        registration: false,
        passwordReset: true,
        rememberMe: true,
    };

    componentDidMount() {
        const { loginWithTokenAsync } = this.props;
        const remember = localStorage.getItem('buff-remember-me');
        const refreshToken = localStorage.getItem('buff-refresh-token');

        window.addEventListener('storage', (e) => {
            if (e.key === 'buff-external-auth') {
                const { rememberMe } = this.state;

                //parsing query stored in the localStorage
                //getting refresh token
                const query = queryString.parse(localStorage.getItem('buff-external-auth'));
                const tokens = JSON.parse(query.tokens);

                //saving tokens if needed and loggin in
                if (rememberMe) {
                    localStorage.setItem('buff-token', tokens.token);
                    localStorage.setItem('buff-refresh-token', tokens.refreshToken);
                }
                loginWithTokenAsync(tokens.refreshToken);

                //cleaning up
                window.removeEventListener('storage');
                localStorage.removeItem('buff-external-auth');
            }
        });

        if (remember) {
            loginWithTokenAsync(refreshToken);
        }
    }

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

    _handleLogin = (e) => {
        e.preventDefault();
        const { login, password, rememberMe } = this.state;
        const { loginAsync } = this.props;

        loginAsync({ login, password, rememberMe });
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
        const { login, password, rememberMe } = this.state;
        const {
            _toggleRegistration,
            _togglePasswordRecovery,
            errorMessage,
            loginDemo,
        } = this.props;

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
                    {errorMessage.length > 0 && <ErrorLabel message={errorMessage} />}
                    <img className={Styles.img} src={logo} alt="buff-logo" />
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
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={this._toggleRememberMe}
                        />
                        <input type="submit" value="Log In" />

                        <a href="http://18.188.224.32:6002/api/accounts/login/discord">
                            <img src={discordLogoWhite} alt="asd" className={Styles.discordLink} />
                        </a>
                    </form>
                    <button onClick={_togglePasswordRecovery} className={Styles.forgotPassButton}>
                        Forgot password?
                    </button>
                    <button onClick={_toggleRegistration} className={Styles.registrationButton}>
                        Not registered yet? Click here!
                    </button>
                    <button onClick={loginDemo} className={Styles.tryDemoButton}>
                        Try demo
                    </button>
                </div>
            </Transition>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
