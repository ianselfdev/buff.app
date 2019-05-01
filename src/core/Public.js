// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { StartupPage } from '../pages';

//Instruments
import { book } from './book';
import { notifications } from '../components/_notifications';

export default class Private extends Component {
    componentDidMount = () => {
        if (!navigator.onLine) {
            return notifications.error(
                'You seem to be offline. Please, check you network connection.',
                5000,
            );
        }
    };

    render() {
        return (
            <Switch>
                <Route path={book.login} component={StartupPage} />
                <Redirect to={book.login} />
            </Switch>
        );
    }
}
