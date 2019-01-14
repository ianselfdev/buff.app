// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Dash } from '../pages';

//Instruments
import { book } from './book';

export default class Private extends Component {
    render() {
        return (
            <Switch>
                <Route path={book.dashboard} component={Dash} />
                <Redirect to={book.dashboard} />
            </Switch>
        );
    }
}
