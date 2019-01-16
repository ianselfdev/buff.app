// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Dashboard, AppBarDashboard } from '../components';

export default class Dash extends Component {
    render() {
        return (
            <ErrorCatcher>
                <AppBarDashboard />
                <Dashboard />
            </ErrorCatcher>
        );
    }
}
