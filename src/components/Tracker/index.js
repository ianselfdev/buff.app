//Core
import React, { Component } from 'react';

//Styles
import './index.scss';

//Instruments
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import { bindActionCreators } from 'redux';
import { setOverwolfListeners } from './instruments/OWListeners';

class Tracker extends Component {
    state = {
        logged: this.props.loggedIntoTracker,
    };

    _handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    _handleLogging = async (e) => {
        e.preventDefault();
        const { logged } = this.state;
        const { trackerLogin, trackerLogout, _toggleTracker } = this.props;

        //checking logged state
        if (logged) {
            console.log('logging out');
            trackerLogout();
            alert('You logged out');
        } else {
            trackerLogin();
            alert('You successfully logged in!');
        }

        setOverwolfListeners(this.props.token);
        _toggleTracker();
    };

    render() {
        const { logged } = this.state;

        return (
            <div id="container">
                {logged ? (
                    <h3>Buff Tracking in Progress</h3>
                ) : (
                    <h3>Buff Achievement Tracker</h3>
                )}
                {logged ? (
                    <h4>You can start playing your favorite game!</h4>
                ) : (
                    <h4>Welcome to Buff Achievement Tracker</h4>
                )}
                <div>
                    {!logged && (
                        <div>
                            <p>
                                In order to get started you have to sign events
                                transactions with your credentials.
                            </p>
                        </div>
                    )}
                    <div>
                        {logged ? (
                            <button onClick={this._handleLogging}>
                                Logout or Change User
                            </button>
                        ) : (
                            <button onClick={this._handleLogging}>Apply</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIntoTracker: state.reducerMain.loggedIntoTracker,
    token: state.reducerMain.token
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tracker);
