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
import googleLogoWhite from '../../theme/assets/Google-Logo-White.png';
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

        return <></>;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
