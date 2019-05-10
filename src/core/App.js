// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Instruments
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '../analytics';

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
        Analytics.appOpened();
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
