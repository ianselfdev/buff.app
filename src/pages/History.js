// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, History, AppBarDashboard } from '../components';

export default class Hist extends Component {
    render() {
        return (
            <ErrorCatcher>
                <AppBarDashboard />
                <History />
            </ErrorCatcher>
        );
    }
}
