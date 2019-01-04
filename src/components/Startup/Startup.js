//Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import Styles from './styles.module.scss';

//Analytics
import ReactGA from 'react-ga';

//Instruments
import Registration from '../Registration';
import Login from '../Login';
import Spinner from '../Spinner';
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

export default class Startup extends Component {
    state = {
        registration: false,
        redirectToReferrer: false,
        isLoading: false,
    };

    _toggleRegistration = () => {
        this.setState((prevState) => ({
            registration: !prevState.registration,
        }));
    };

    render() {
        // console.log(this.props);

        const { from } = this.props.location.state || {
            from: { pathname: '/' },
        };
        const {
            redirectToReferrer,
            registration,
            isLoading,
        } = this.state;

        const {onLogin} = this.props;

        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (redirectToReferrer && from.pathname !== '/') {
            return <Redirect to={from} />;
        }

        if (isLoading) {
            return <Spinner />;
        } else {
            return (
                <div className={registration ? Styles.containerRegistration : Styles.container}>
                    {registration ?
                            <Registration
                                _closeRegistration={this._toggleRegistration}
                            />
                        : 
                            <Login onLogin={onLogin} _toggleRegistration={this._toggleRegistration}/>
                    } 
                </div>
                
            );
        }
    }
}
