//Core
import React, { Component } from 'react';

//Styles
import './index.scss';

//Instruments
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import { bindActionCreators } from 'redux';
import { validateAddress } from './instruments/logging';
import { setOverwolfListeners } from './instruments/OWListeners';

class Tracker extends Component {
    state = {
        logged: this.props.loggedIntoTracker,

        //values
        address: '',
        secret: '',
    };

    _handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    _handleLogging = async (e) => {
        e.preventDefault();
        const { logged, address, secret } = this.state;
        const { trackerLogin, trackerLogout, _toggleTracker } = this.props;

        //checking logged state
        if (logged) {
            // console.log('logging out');
            trackerLogout();
            alert('You logged out');
        } else {
            //if not logged - validating fields
            if (!address || !secret) {
                alert('Fill in all the fields, please!');
                return null;
            }

            //actual logging function
            const result = await validateAddress(address, secret);

            if (!result.success || !result.verified) {
                alert('Verification not passed');
                return null;
            }

            trackerLogin();
            alert('You successfully logged in!');
        }

        setOverwolfListeners(address, secret);
        _toggleTracker();
    };

    render() {
        const { logged } = this.state;
        // console.log(this.props);

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
                    {logged ? null : (
                        <div>
                            <p>
                                In order to get started you have to sign events
                                transactions with your credentials.
                            </p>
                            <p>
                                You received it via email after registration in
                                buff.app
                            </p>
                        </div>
                    )}
                    <div>
                        {logged ? null : (
                            <form onSubmit={this._handleLogging}>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Put here your address"
                                    onChange={this._handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="secret"
                                    placeholder="Put here your secret"
                                    onChange={this._handleInputChange}
                                />
                                <input type="submit" hidden />
                            </form>
                        )}
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
