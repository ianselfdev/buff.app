// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Navbar, Market } from '../components';

export default class Marketplace extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <Market />
            </ErrorCatcher>
        );
    }
}
