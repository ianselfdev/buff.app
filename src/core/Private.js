// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Dash, Hist, Lead, Market, Tournaments } from '../pages';

//Instruments
import { book } from './book';

export default class Private extends Component {
    render() {
        return (
            <Switch>
                <Route path={book.dashboard} component={Dash} />
                <Route path={book.history} component={Hist} />
                <Route path={book.leaderboard} component={Lead} />
                <Route path={book.market} component={Market} />
                <Route path={book.tournaments} component={Tournaments} />
                <Redirect to={book.dashboard} />
            </Switch>
        );
    }
}
