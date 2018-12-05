import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './Leaderboard.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/mainActions';
import SwipeableViews from 'react-swipeable-views';

import TableRow from '../TableRow';

class Leaderboard extends Component {
    state = {
        //!--WARNING!-------------------------------------------------------HARDCODED DATA!
        //!--WARNING!-------------------------------------------------------HARDCODED DATA!
        //!--WARNING!-------------------------------------------------------HARDCODED DATA!
        data: [
            {
                publicKey: 'sdfsdf232323e3d2323rffef32223f',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: '89sdflh48o43834o4er9fe9rf894jf',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: 'ncns9z8z8s9aa3n32b66bwefjwefbz7',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: '7sdfn40fewiwfj9r99333737g25flew',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: 'nskdfnsdf78473byu3byr73br23o237',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: 'ab9b7as74b3y4f7364b2yu3v2387vfw',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: '327uybds767d6sdfvy30dfsa9fb4g3',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: 'ncns9z8z8s9aa3n32b66bwefjwefbz7',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: '7sdfn40fewiwfj9r99333737g25flew',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: 'nskdfnsdf78473byu3byr73br23o237',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: 'ab9b7as74b3y4f7364b2yu3v2387vfw',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
            {
                publicKey: '327uybds767d6sdfvy30dfsa9fb4g3',
                win: Math.round(Math.random() * 10),
                lose: Math.round(Math.random() * 10),
                reward: Math.round(Math.random() * 100),
            },
        ],
        index: 0,
    };

    _handleChange = (event, value) => {
        this.setState({
            index: value,
        });
    };

    _handleChangeIndex = (index) => {
        this.setState({
            index,
        });
    };

    render() {
        const { index } = this.state;

        const dataLiderboard = this.state.data;
        const dataLiderboardLoL = this.state.dataLoL;

        console.log(dataLiderboard);
        console.log(dataLiderboardLoL);

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
                        </Tabs>
                        <SwipeableViews
                            index={index}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <div>
                                <TableRow header />
                                <div className="table-data">
                                    {dataLiderboard.map((item) => {
                                        return (
                                            <TableRow
                                                name="Dota 2"
                                                period="past week"
                                                publicKey={item.publicKey}
                                                win={item.win}
                                                lose={item.lose}
                                                reward={item.reward}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <TableRow header />
                                <div className="table-data">
                                    {dataLiderboard.map((item) => {
                                        return (
                                            <TableRow
                                                name="LoL"
                                                period="past week"
                                                publicKey={item.publicKey}
                                                win={item.win}
                                                lose={item.lose}
                                                reward={item.reward}
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
