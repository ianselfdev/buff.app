// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Dash, Hist, Lead, Marketplace, Tournaments } from '../pages';

//Instruments
import { book } from './book';
import { setOverwolfListeners } from '../components/Tracker/instruments/OWListeners';

export default class Private extends Component {
    componentDidMount = () => {
        const token = localStorage.getItem('buff-token');

        try {
            console.log('setting listeners...');
            setOverwolfListeners(token);
        } catch (error) {
            return null;
        }
    };
    render() {
        return (
            <Switch>
                <Route path={book.dashboard} component={Dash} />
                <Route path={book.history} component={Hist} />
                <Route path={book.leaderboard} component={Lead} />
                <Route path={book.market} component={Marketplace} />
                <Route path={book.tournaments} component={Tournaments} />
                <Redirect to={book.dashboard} />
            </Switch>
        );
    }
}
