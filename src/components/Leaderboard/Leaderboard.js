import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './Leaderboard.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/mainActions';
import SwipeableViews from 'react-swipeable-views';

import Api from '../../Store/ApiRequests';

import TableRow from '../TableRow';

class Leaderboard extends Component {
    state = {
        dataDota: [],
        dataLol: [],
        dataFortnite: [],
        index: 0,
    };

    componentDidMount = async () => {
        const dota = await Api.getLeaderboardDotaAPI();

        const lol = await Api.getLeaderboardLoLAPI();

        console.log(dota, lol);

        this.setState({
            dataDota: dota.data.leaderbord,
            dataLol: lol.data.leaderbord,
            dataFortnite: dota.data.leaderbord,
        });
    };

    _handleChange = (event, value) => {
        console.log('handlechange ', value);

        this.setState({
            index: value,
        });
    };

    _handleChangeIndex = (index) => {
        console.log('handlechangeindex ', index);

        this.setState({
            index,
        });
    };

    render() {
        const { index, dataDota, dataLol, dataFortnite } = this.state;

        return (
            <div>
                <p className="leaderboard-header-text">
                    Start playing to earn more coins!
                </p>
                <h4>
                    You will earn more coins by marking achievement in active
                    game
                </h4>
                <div className="leaderboard-container">
                    <div className="leaderboard-table">
                        <div className="leaderboard-title">Leaderboard</div>
                        <Tabs
                            value={index}
                            fullWidth
                            className="table-tabs"
                            indicatorColor="secondary"
                            onChange={this._handleChange}
                        >
                            <Tab
                                style={{
                                    fontWeight: 'bold',
                                    color: '#026d39',
                                    fontSize: '0.9rem',
                                }}
                                label="Dota 2"
                            />
                            <Tab
                                style={{
                                    fontWeight: 'bold',
                                    color: '#026d39',
                                    fontSize: '0.9rem',
                                }}
                                label="League of legends"
                            />
                            <Tab
                                style={{
                                    fontWeight: 'bold',
                                    color: '#026d39',
                                    fontSize: '0.9rem',
                                }}
                                label="Fortnite"
                            />
                        </Tabs>
                        <SwipeableViews
                            index={index}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <div>
                                <TableRow header />
                                <div className="table-data">
                                    {dataDota.map((item, index) => {
                                        return (
                                            <TableRow
                                                name="Dota 2"
                                                period="past week"
                                                publicKey={item.publicKey}
                                                win={item.win}
                                                lose={item.lose}
                                                reward={item.reward}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <TableRow header />
                                <div className="table-data">
                                    {dataLol.map((item, index) => {
                                        return (
                                            <TableRow
                                                name="LoL"
                                                period="past week"
                                                publicKey={item.publicKey}
                                                win={item.win}
                                                lose={item.lose}
                                                reward={item.reward}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <TableRow header />
                                <div className="table-data">
                                    {dataFortnite.map((item, index) => {
                                        return (
                                            <TableRow
                                                name="Fortnite"
                                                period="past week"
                                                publicKey={item.publicKey}
                                                win={item.win}
                                                lose={item.lose}
                                                reward={item.reward}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </SwipeableViews>
                    </div>

                    {/* discord widget */}
                    <div className="papersMain">
                        <Paper className="myAcc" elevation={8}>
                            <div className="titleMyAcc">Chat Box</div>
                            <div className="balanceMyAcc">
                                <div style={{ color: '#919191' }}>
                                    <iframe
                                        src="https://discordapp.com/widget?id=442965268386283521&theme=dark"
                                        width="300"
                                        height="350"
                                        allowtransparency="true"
                                        frameBorder="0"
                                    />
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allLeaaderBoard: state.reducerMain.leaderBoardDota,
    allLeaaderBoardLol: state.reducerMain.leaderBoardLol,
    username: state.reducerMain.username,
    online: state.reducerMain.onlineUsers,
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Leaderboard);
