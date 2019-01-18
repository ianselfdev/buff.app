// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, MarketPlace, Navbar } from '../components';

export default class Market extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <MarketPlace />
            </ErrorCatcher>
        );
    }
}
