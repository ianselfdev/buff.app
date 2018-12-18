import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    withStyles,
    FormHelperText,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import './Registration.scss';
import { realAuth } from '../../routes';
import { Redirect } from 'react-router-dom';

const styles = (theme) => {
    return {
        formControl: {
            margin: theme.spacing.unit * 1.5,
            width: 260,
        },
        inputLabelFocused: {
            color: green[100],
        },
        listCountries: {
            marginTop: theme.spacing.unit * 3,
        },
        FormHelperText: {
            color: red[500],
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
    };
};

class Registration extends Component {
    state = {
        isLoading: false,
        username: '',
        fullname: '',
        confPassword: '',
        confEmail: '',
        email: '',
        password: '',
        emailIsEqual: '',
        passwordIsEqual: '',
        open: false,
        anchorEl: null,
        selectedIndex: 1,
        errorStatus: true,
        errorMessage: { field: '' },
    };
    handleChangeUsername = (e) => {
        if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
            return null;
        }
        this.setState({
            username: e.target.value,
        });
    };
    handleChangeFullName = (e) => {
        if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
            return null;
        }
        this.setState({
            fullname: e.target.value,
        });
    };
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    handleChangeConfEmail = (e) => {
        this.setState({
            confEmail: e.target.value,
        });
    };
    handleChangeConfPassword = (e) => {
        this.setState({
            confPassword: e.target.value,
        });
    };
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    handleBackToLogin = () => {
        this.props.onBackToLogin({});
    };
    handleRegister = () => {
        this.setState({
            emailIsEqual: this.state.email === this.state.confEmail,
            passwordIsEqual: this.state.password === this.state.confPassword,
        });

        if (
            this.state.email === this.state.confEmail &&
            this.state.password === this.state.confPassword
        ) {
            // console.log(this.state);
            let self = this;

            self.setState({ isLoading: true });
            if (!realAuth.isAuthenticated) {
                realAuth
                    .registration({
                        username: self.state.username,
                        fullname: self.state.fullname,
                        email: self.state.email,
                        password: self.state.password,
                    })
                    .then((isAuthenticated) => {
                        self.setState({
                            redirectToReferrer: isAuthenticated.status,
                            isLoading: false,
                        });
                        console.log('isRegistered.status', isAuthenticated);
                        if (isAuthenticated.status) {
                            self.props.onRegister(isAuthenticated);
                        } else {
                            let errData = JSON.parse(isAuthenticated.data);
                            console.log('isAuthenticated.data', errData);
                            this.setState({
                                errorStatus: isAuthenticated.status,
                                errorMessage: errData,
                            });
                        }
                    })
                    .catch((div) => {
                        console.log('div::>', div);
                    });
            }
        }
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: '/' },
        };
        const {
            redirectToReferrer,
            username,
            fullname,
            email,
            password,
            confEmail,
            confPassword,
        } = this.state;

        const validation =
            username.length >= 6 &&
            username.length <= 18 &&
            fullname.length >= 6 &&
            fullname.length <= 50 &&
            email === confEmail &&
            password === confPassword &&
            email.length > 0 &&
            password.length > 0 &&
            confEmail.length > 0 &&
            confPassword.length > 0;

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
            <div className="RegistrationComponent">
                <Button
                    variant="raised"
                    className="buttonExit"
                    onClick={this.handleBackToLogin}
                >
                    Back to login
                </Button>
                <Button
                    variant="raised"
                    className="buttonRegister"
                    onClick={this.handleRegister}
                    disabled={!validation}
                >
                    Sign Up
                </Button>

                <div className="RegistrationTitle">Registration</div>
                <div className="RegistrationMain">
                    <Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} container>
                                <Grid item xs={3}>
                                    <p className="Line">Full Name:</p>
                                    <p className="Line">Username:</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl
                                        className={
                                            this.props.classes.formControl
                                        }
                                        error={!this.state.errorStatus}
                                        aria-describedby={
                                            this.state.errorMessage.field
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="Fullname"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Full Name{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            id="FullName"
                                            onChange={this.handleChangeFullName}
                                            value={fullname}
                                        />
                                        <FormHelperText
                                            id="fullname"
                                            className={
                                                this.props.classes
                                                    .FormHelperText
                                            }
                                        >
                                            {fullname.length < 6 ||
                                            fullname.length > 50
                                                ? 'This field must be from 6 to 50 chars long'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        className={
                                            this.props.classes.formControl
                                        }
                                        error={!this.state.errorStatus}
                                        aria-describedby={
                                            this.state.errorMessage.field
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="username"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Username{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            id="username"
                                            onChange={this.handleChangeUsername}
                                            value={username}
                                        />
                                        <FormHelperText
                                            id="username"
                                            className={
                                                this.props.classes
                                                    .FormHelperText
                                            }
                                        >
                                            {username.length < 6 ||
                                            username.length > 18
                                                ? 'This field must be from 6 to 18 chars long'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <p className="Line1">Email address:</p>
                                    <p className="Line1">
                                        Confirm Email address:
                                    </p>
                                    <p className="Line1">Password:</p>
                                    <p className="Line1">Confirm Password:</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl
                                        className={
                                            this.props.classes.formControl
                                        }
                                        error={!this.state.errorStatus}
                                        aria-describedby={
                                            this.state.errorMessage.field
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="EmailAddress"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Email address{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            id="EmailAddress"
                                            onChange={this.handleChangeEmail}
                                        />
                                        <FormHelperText
                                            id="email"
                                            className={
                                                this.props.classes
                                                    .FormHelperText
                                            }
                                        >
                                            {this.state.errorMessage.field ===
                                            'email'
                                                ? this.state.errorMessage
                                                      .message
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl
                                        className={
                                            this.props.classes.formControl
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="ConfirmEmailAddress"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Confirm Email address{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            id="ConfirmEmailAddress"
                                            onChange={
                                                this.handleChangeConfEmail
                                            }
                                        />
                                        <FormHelperText
                                            className={
                                                this.props.classes
                                                    .FormHelperText
                                            }
                                        >
                                            {email !== confEmail
                                                ? 'Emails do not match.'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl
                                        className={
                                            this.props.classes.formControl
                                        }
                                        error={!this.state.errorStatus}
                                        aria-describedby={
                                            this.state.errorMessage.field
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="Password"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Password{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            type="Password"
                                            id="Password"
                                            onChange={this.handleChangePassword}
                                        />
                                        <FormHelperText
                                            id="password"
                                            className={
                                                this.props.classes
                                                    .FormHelperText
                                            }
                                        >
                                            {this.state.errorMessage.field ===
                                            'password'
                                                ? this.state.errorMessage
                                                      .message
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl
                                        className={
                                            this.props.classes.formControl
                                        }
                                    >
                                        <InputLabel
                                            formcontrolclasses={{
                                                focused: this.props.classes
                                                    .inputLabelFocused,
                                            }}
                                            htmlFor="ConfirmPassword"
                                        >
                                            <font color="#C8E6C9">
                                                {' '}
                                                Confirm Password{' '}
                                            </font>
                                        </InputLabel>
                                        <Input
                                            type="password"
                                            id="ConfirmPassword"
                                            onChange={
                                                this.handleChangeConfPassword
                                            }
                                        />
                                        <FormHelperText
                                            className={
                                                this.props.classes
                                                    .FormHelperText
                                            }
                                        >
                                            {password !== confPassword
                                                ? 'Passwords do not match.'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

Registration.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
