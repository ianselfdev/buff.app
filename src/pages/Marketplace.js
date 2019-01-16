// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, MarketPlace, AppBarDashboard } from '../components';

export default class Market extends Component {
    render() {
        return (
            <ErrorCatcher>
                <AppBarDashboard />
                <MarketPlace />
            </ErrorCatcher>
        );
    }
}
