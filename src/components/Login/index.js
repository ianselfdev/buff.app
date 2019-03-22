//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

//Components
import LabeledInput from '../LabeledInput';

//Styles
import Styles from './styles.module.scss';

//Instruments
import discordLogoWhite from '../../theme/assets/Discord-Logo-White.png';
import googleLogoWhite from '../../theme/assets/Google-Logo-White.png';
import queryString from 'query-string';
import gsap from 'gsap';

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

        window.addEventListener('storage', this._localStorageListener);

        if (remember) {
            loginWithTokenAsync(refreshToken);
        }
    }

    componentWillUnmount = () => {
        //cleaning up
        window.removeEventListener('storage', this._localStorageListener);
        localStorage.removeItem('buff-external-auth');
    };

    _localStorageListener = (e) => {
        const { loginWithTokenAsync } = this.props;

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

    _handleLogin = (e) => {
        e.preventDefault();
        const { login, password, rememberMe } = this.state;
        const { loginAsync } = this.props;

        loginAsync({ login, password, rememberMe });
    };

    //* animation group
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

        const inputFields = [
            {
                value: login,
                onChange: this._handleInput,
                name: 'login',
                type: 'text',
                label: 'Login',
            },
            {
                value: password,
                onChange: this._handleInput,
                name: 'password',
                type: 'password',
                label: 'Password',
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
                    <p className={Styles.title}>Sign in</p>
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
                    <div className={Styles.functionalContainer}>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            className={Styles.checkbox}
                            onChange={this._toggleRememberMe}
                        />
                        <span className={Styles.forgotPassword} onClick={_togglePasswordRecovery}>
                            Forgot password?
                        </span>
                    </div>
                    <div className={Styles.buttonsContainer}>
                        <button onClick={this._handleLogin}>Log in</button>
                        <button>Try demo</button>
                    </div>
                    <p className={Styles.accountCreation}>
                        Don't have an account?{' '}
                        <span onClick={_toggleRegistration}>Create an account</span>
                    </p>
                    <div className={Styles.socialContainer}>
                        <img src={discordLogoWhite} alt="discord login" />
                        <img src={googleLogoWhite} alt="google login" />
                    </div>
                </div>
            </Transition>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
