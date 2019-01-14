//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import TableRow from '../TableRow';

//Styles
import Styles from './styles.module.scss';

//Instruments
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SwipeableViews from 'react-swipeable-views';

//Actions
import { leaderboardActions } from '../../bus/app/leaderboard/actions';

const mapStateToProps = (state) => ({
    leaderboard: state.leaderboard,
});

const mapDispatchToProps = {
    fetchLeadersDotaAsync: leaderboardActions.fetchLeadersDotaAsync,
};

class Leaderboard extends Component {
    state = {
        dataDota: [],
        dataLol: [],
        dataFortnite: [],
        index: 0,
    };

    componentDidMount = () => {
        const { fetchLeadersDotaAsync } = this.props;
        fetchLeadersDotaAsync();
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
        const { leaderboard } = this.props;

        return (
            <div className={Styles.container}>
                <p className={Styles.leaderboardHeaderText}>Start playing to earn more coins!</p>
                <h4>You will earn more coins by marking achievement in active game</h4>
                <div className={Styles.leaderboardContainer}>
                    <div className={Styles.leaderboardTable}>
                        <div className={Styles.leaderboardTitle}>Leaderboard</div>
                        <Tabs
                            value={index}
                            fullWidth
                            onChange={this._handleChange}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: '#00753d',
                                },
                            }}
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
                        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                            <div>
                                <TableRow header />
                                <div className={Styles.tableData}>
                                    {leaderboard.map((item, index) => {
                                        return (
                                            <TableRow
                                                name="Dota 2"
                                                period="past week"
                                                nickname={item.nickname}
                                                wins={item.wins}
                                                reward={item.reward}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <TableRow header />
                                <div className={Styles.tableData}>
                                    {leaderboard.map((item, index) => {
                                        return (
                                            <TableRow
                                                name="LoL"
                                                period="past week"
                                                win={item.win}
                                                reward={item.reward}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <TableRow header />
                                <div className={Styles.tableData}>
                                    {leaderboard.map((item, index) => {
                                        return (
                                            <TableRow
                                                name="Fortnite"
                                                period="past week"
                                                win={item.win}
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
                    <iframe
                        src="https://discordapp.com/widget?id=442965268386283521&theme=dark"
                        width="350"
                        height="400"
                        allowtransparency="true"
                        frameBorder="0"
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Leaderboard);
