import React, { Component } from 'react';
import './MarketPlace.scss';
import { Grid } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/mainActions';
import { connect } from 'react-redux';

const title = 'start playing and earn coins!';

class MarketPlace extends Component {
    render() {
        let onlineUser = this.props.online;
        let userBalance = this.props.userBalance;
        return (
            <div className="dashboardComponent">
                <Grid container spacing={24}>
                    <Grid item xs={12} container>
                        <Grid item xs={10}>
                            <div
                                className="dashboardTitle"
                                style={{ width: 300, height: 80 }}
                            >
                                {title.toLocaleUpperCase()}
                            </div>
                            <div
                                className="contentTitle"
                                style={{ width: 550, height: 60 }}
                            >
                                You will earn more coins by marking achievement
                                in active game
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <h4>online users: {onlineUser ? onlineUser : 0}</h4>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="dashboardMain">
                    <div className="comingSoon" />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    online: state.reducerMain.onlineUsers,
    userBalance: state.reducerMain.userBalance,
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketPlace);
