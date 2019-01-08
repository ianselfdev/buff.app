//Core
import React, { Component } from 'react';

//Instruments
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import { bindActionCreators } from 'redux';
import { setOverwolfListeners } from './instruments/OWListeners';

class Tracker extends Component {
    componentDidUpdate = () => {
        const { token } = this.props;

        setOverwolfListeners(token);
    };

    render() {
        return <div />;
    }
}

const mapStateToProps = (state) => ({
    loggedIntoTracker: state.reducerMain.loggedIntoTracker,
    token: state.reducerMain.token,
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
