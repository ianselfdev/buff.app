// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Dashboard, Navbar } from '../components';

export default class Dash extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <Dashboard />
            </ErrorCatcher>
        );
    }
}
