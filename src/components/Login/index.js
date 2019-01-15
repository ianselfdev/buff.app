//Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

//Components
import ErrorLabel from '../ErrorLabel';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../theme/assets/logo.png';
import gsap from 'gsap';

//Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    loginAsync: authActions.loginAsync,
    loginWithTokenAsync: authActions.loginWithTokenAsync,
};

class Login extends Component {
    state = {
        status: {},
        login: 'roquefore',
        password: 'peacemaker7686400',
        registration: false,
        rememberMe: false,
    };

    componentDidMount() {
        const { loginWithTokenAsync } = this.props;
        const remember = localStorage.getItem('buff-remember-me');
        const refreshToken = localStorage.getItem('buff-refresh-token');

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
        const { _toggleRegistration } = this.props;

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
                    {/* {errorMessage.length > 0 && <ErrorLabel message={errorMessage} />} */}
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
                    </form>
                    <button
                        onClick={() => {
                            console.log('lol');
                        }}
                        className={Styles.forgotPassButton}
                    >
                        Forgot password?
                    </button>
                    <button onClick={_toggleRegistration} className={Styles.registrationButton}>
                        Not registered yet? Click here!
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
