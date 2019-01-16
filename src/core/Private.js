// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Dash, Hist, Lead, Market, Tournaments } from '../pages';

//Instruments
import { book } from './book';
import { setOverwolfListeners } from '../components/Tracker/instruments/OWListeners';

export default class Private extends Component {
    componentDidMount = () => {
        const token = localStorage.getItem('buff-token');

        console.log('setting listeners...');
        console.log('token ->', token);
        setOverwolfListeners(token);
    };
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
