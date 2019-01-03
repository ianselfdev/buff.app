//Core
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../assets/logo.png';
import Spinner from '../Spinner';
import { realAuth } from '../../routes';

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
            this.setState({
                isLoading: true,
            });

            const response = await Api.postLogin({
                email: login,
                password,
            });
            if (!response.success) return;

            // console.log('parsed: ', JSON.parse(response.tokens.token));
            const user = await Api.getCurrentUser(response.tokens.token);
            await realAuth.authenticate(user.data);
            console.log("What", realAuth.isAuthenticated);

            onLogin({...user.data.account, ...response.tokens});

            this.setState({
                redirectToReferrer: response.success,
                status: response,
                isLoading: false,
                login: '',
                password: '',
            });
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    };

    render() {
        const from = {
            from: { pathname: '/' },
        };

        const {
            redirectToReferrer,
            login,
            password,
        } = this.state;

        const {_toggleRegistration} = this.props;

        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (redirectToReferrer && from.pathname !== '/') {
            return <Redirect to={from} />;
        }

        return (
            <Fragment>
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
            </Fragment>
        );
    }
}
