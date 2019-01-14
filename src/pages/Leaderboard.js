// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Leaderboard, AppBarDashboard } from '../components';

export default class Lead extends Component {
    render() {
        return (
            <ErrorCatcher>
                <AppBarDashboard />
                <Leaderboard />
            </ErrorCatcher>
        );
    }
}
