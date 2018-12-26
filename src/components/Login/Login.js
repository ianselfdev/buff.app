import React, { Component } from 'react';
// import Grid from "material-ui/Grid";
import {
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    FormHelperText,
    Popover,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import './Login.scss';
import { realAuth } from '../../routes';
import { Redirect } from 'react-router-dom';
import { red, green } from '@material-ui/core/colors';

//Analytics
import ReactGA from 'react-ga';

const styles = (theme) => {
    return {
        formControl: {
            marginRight: theme.spacing.unit * 15,
            marginLeft: theme.spacing.unit * 15,
            marginBottom: theme.spacing.unit,
            width: 240,
        },
        FormHelperText: {
            display: 'flex',
            justifyContent: 'center',
            color: red[500],
        },
        formControl2: {
            marginBottom: theme.spacing.unit * 5,
            width: 250,
        },
        inputLabelFocused: {
            color: green[100],
        },
        inputUnderline: {
            color: '#fff',
            '&:after': {
                backgroundColor: green[100],
            },
            '&:before': {
                backgroundColor: green[300],
            },
        },
        flatbutton: {
            marginBottom: theme.spacing.unit * 4,
            color: green[100],
        },
    };
};

const loginContainerStyle = {
    width: '100%',
    height: '100%',
    align: 'center',
    marginTop: '25px',
};

class Login extends Component {
    state = {
        status: {
            status: null,
            data: null,
        },
        login: '',
        password: '',
        open: false,
        anchorEl: null,
        redirectToReferrer: false,
        isLoading: false,
    };

    handleLogin = async () => {
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

    handleRegistration = () => {
        ReactGA.event({
            category: 'authentication',
            action: 'Registration',
        });
        this.props.onRegister();
    };

    handleChangeLogin = (e) => {
        this.setState({
            login: e.target.value,
        });
    };

    handleChangePass = (e) => {
        this.setState({
            password: e.target.value,
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

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: '/' },
        };
        const { redirectToReferrer, login, open } = this.state;

        //! FUCK IT. Move Spinner to a separate component.
        if (this.state.isLoading) {
            return (
                <div className="LoginMain">
                    <div className="loader-inner">
                        <div className="loader-line-wrap">
                            <div className="loader-line" />
                        </div>
                        <div className="loader-line-wrap">
                            <div className="loader-line" />
                        </div>
                        <div className="loader-line-wrap">
                            <div className="loader-line" />
                        </div>
                        <div className="loader-line-wrap">
                            <div className="loader-line" />
                        </div>
                        <div className="loader-line-wrap">
                            <div className="loader-line" />
                        </div>
                    </div>
                </div>
            );
        }
        if (redirectToReferrer && from.pathname !== '/') {
            return <Redirect to={from} />;
        }
        return (
            <div className="LoginMain" onKeyPress={this.onKeyPress}>
                <div style={loginContainerStyle} className="container">
                    <Grid style={loginContainerStyle}>
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel
                                formcontrolclasses={{
                                    focused: this.props.classes
                                        .inputLabelFocused,
                                }}
                                htmlFor="login"
                            >
                                <font color="#C8E6C9"> Username or Email </font>
                            </InputLabel>
                            <Input
                                id="login"
                                onChange={this.handleChangeLogin}
                                required={true}
                            />
                        </FormControl>

                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel
                                required={true}
                                formcontrolclasses={{
                                    focused: this.props.classes
                                        .inputLabelFocused,
                                }}
                                htmlFor="password"
                            >
                                <font color="#C8E6C9"> Password </font>
                            </InputLabel>
                            <Input
                                type="password"
                                id="password"
                                onChange={this.handleChangePass}
                            />
                        </FormControl>
                        <FormHelperText
                            className={this.props.classes.FormHelperText}
                        >
                            {this.state.status.status === false
                                ? this.state.status.data
                                : ''}
                        </FormHelperText>
                        <Button
                            variant="contained"
                            className="buttonMain"
                            onClick={this.handleLogin}
                        >
                            Log In
                        </Button>
                        <div className="buttomDown">
                            <Button
                                variant="contained"
                                className="buttonMain"
                                onClick={this.handleRegistration}
                            >
                                Not registered yet? Click here!
                            </Button>
                            <Button
                                className={this.props.classes.flatbutton}
                                // onClick={this.handleForgotPassword}
                            >
                                Forgot password? click here!
                            </Button>
                        </div>
                        <Popover
                            open={open}
                            anchorPosition={{ top: 500, left: 400 }}
                            onClose={this.handleCloseForgotPassword}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                        >
                            <div
                                className="LoginMain"
                                style={{ background: '#212121', margin: '0px' }}
                            >
                                <p>
                                    <font face="Helvetica" color="#E8F5E9">
                                        If you've forgotten your password, you
                                        can use this form to reset it. After
                                        resetting, a message will be sent to
                                        your email address. If you do not find
                                        the message in your inbox, please check
                                        if the message did not reach your spam.
                                    </font>
                                </p>
                                <center>
                                    <FormControl
                                        className={
                                            this.props.classes.formControl2
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="emailField"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Your email:{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            id="emailField"
                                            onChange={this.handleChange}
                                            required={true}
                                        />
                                    </FormControl>
                                </center>
                                <Button
                                    variant="contained"
                                    className="buttonSendMe"
                                >
                                    Send me
                                </Button>
                                <Button
                                    variant="contained"
                                    className="buttonExitPassword"
                                    onClick={this.handleCloseForgotPassword}
                                >
                                    CLOSE
                                </Button>
                            </div>
                        </Popover>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
