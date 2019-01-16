// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Startup, Spinner } from '../components';

export default class StartupPage extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Startup />
                <Spinner />
            </ErrorCatcher>
        );
    }
}
