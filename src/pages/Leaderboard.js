// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Leaderboard, Navbar } from '../components';

export default class Lead extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <Leaderboard />
            </ErrorCatcher>
        );
    }
}
