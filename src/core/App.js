// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Instruments
import { ToastContainer } from 'react-toastify';
import { notifications } from '../components/_notifications';
import 'react-toastify/dist/ReactToastify.css';

//Components
import { TopControlBar } from '../components';
import Private from './Private';
import Public from './Public';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
    };
};

class App extends Component {
    componentDidMount = () => {
        if (!navigator.onLine) {
            notifications.error('You seem to be offline. Please, check you network connection.');
        }
    };

    render() {
        const { isAuthenticated } = this.props;

        return (
            <>
                <TopControlBar />
                {isAuthenticated ? <Private /> : <Public />}
                <ToastContainer
                    className="toast-container"
                    progressClassName="toast-progress-line"
                />
            </>
        );
    }
}

export default hot(module)(withRouter(connect(mapStateToProps)(App)));
