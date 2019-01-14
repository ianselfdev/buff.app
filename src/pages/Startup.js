// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, Login, Spinner } from '../components';

export default class Startup extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Login />
                <Spinner />
            </ErrorCatcher>
        );
    }
}
