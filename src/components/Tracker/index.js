//Core
import React, { Component } from 'react';

//Instruments
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import { bindActionCreators } from 'redux';
import { setOverwolfListeners } from './instruments/OWListeners';

class Tracker extends Component {
    componentDidMount = () => {
        const { _toggleTracker } = this.props;
        setOverwolfListeners(this.props.token);
        _toggleTracker();
    };

    render() {
        return <div id="container" />;
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
