// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, History, Navbar } from '../components';

export default class Hist extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <History />
            </ErrorCatcher>
        );
    }
}
