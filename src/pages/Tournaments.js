// Core
import React, { Component } from 'react';

// Components
import { ErrorCatcher, NewsTournaments, Navbar } from '../components';

export default class Tournaments extends Component {
    render() {
        return (
            <ErrorCatcher>
                <Navbar />
                <NewsTournaments />
            </ErrorCatcher>
        );
    }
}
