//Core
import React, { Component } from 'react';

//Instruments
import { connect } from 'react-redux';
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
    //...
});

function mapDispatchToProps(dispatch) {
    //...
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tracker);
