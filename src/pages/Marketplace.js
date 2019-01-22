// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Navbar, Market, Spinner } from '../components';

export default class Marketplace extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <Market />
                <Spinner />
            </ErrorCatcher>
        );
    }
}
