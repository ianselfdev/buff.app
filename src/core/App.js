// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import Private from './Private';
import Public from './Public';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
    };
};

class App extends Component {
    render() {
        const { isAuthenticated } = this.props;

        return isAuthenticated ? <Private /> : <Public />;
    }
}

export default hot(module)(withRouter(connect(mapStateToProps)(App)));