// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, NewsTournaments, AppBarDashboard } from '../components';

export default class Tournaments extends Component {
    render() {
        return (
            <ErrorCatcher>
                <AppBarDashboard />
                <NewsTournaments />
            </ErrorCatcher>
        );
    }
}
