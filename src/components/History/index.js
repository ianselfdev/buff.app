//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import ErrorCatcher from '../ErrorCatcher';
import HistoryInstruments from '../HistoryInstruments';
import TableRow from '../TableRow';

//Instruments
import { UserStatsByGame } from '../_charts/UserStatsByGame';
import { TimeSpentChart } from '../_charts/TimeSpentChart';
import { BuffEarnedChart } from '../_charts/BuffEarnedChart';

//Analytics
import { Analytics } from '../../analytics';

//Actions
import { historyActions } from '../../bus/app/history/actions';
import { statisticsActions } from '../../bus/app/statistics/actions';

//!__temporary stuff until back v2 comes live
//REST
import { Api } from '../../REST/api';

const headerFields = [
    {
        name: 'Type',
    },
    {
        name: 'Date',
    },
    {
        name: 'Game Name',
    },
    {
        name: 'Buff coins',
    },
];

const mapStateToProps = (state) => ({
    history: state.history,
    rewardStatistics: state.statistics.get('rewardStatistics'),
    countStatistics: state.statistics.get('countStatistics'),
});

const mapDispatchToProps = {
    fetchHistoryAsync: historyActions.fetchHistoryAsync,
    fetchStatisticsAsync: statisticsActions.fetchStatisticsAsync,
};

class History extends Component {
    state = {
        active: 'statistics',
        dotaStats: {
            countStatistics: [1],
            rewardStatistics: [1],
        },
        lolStats: {
            countStatistics: [1],
            rewardStatistics: [1],
        },
        fortniteStats: {
            countStatistics: [1],
            rewardStatistics: [1],
        },
        csgoStats: {
            countStatistics: [1],
            rewardStatistics: [1],
        },
    };

    componentDidMount = async () => {
        const { fetchHistoryAsync, fetchStatisticsAsync } = this.props;

        fetchHistoryAsync();
        fetchStatisticsAsync();

        //!__temporary stuff until back v2 comes live
        const dotaResult = await Api.data.fetchStatistics({ gameId: 7314 });
        const dotaStats = await dotaResult.json();

        const lolResult = await Api.data.fetchStatistics({ gameId: 5426 });
        const lolStats = await lolResult.json();

        const fortniteResult = await Api.data.fetchStatistics({ gameId: 21216 });
        const fortniteStats = await fortniteResult.json();

        const csgoResult = await Api.data.fetchStatistics({ gameId: 7764 });
        const csgoStats = await csgoResult.json();

        this.setState({
            dotaStats: {
                rewardStatistics: dotaStats.rewardStatistics.map((item) => item.amount),
                countStatistics: dotaStats.countStatistics.map((item) => item.count),
            },
            lolStats: {
                rewardStatistics: lolStats.rewardStatistics.map((item) => item.amount),
                countStatistics: lolStats.countStatistics.map((item) => item.count),
            },
            fortniteStats: {
                rewardStatistics: fortniteStats.rewardStatistics.map((item) => item.amount),
                countStatistics: fortniteStats.countStatistics.map((item) => item.count),
            },
            csgoStats: {
                rewardStatistics: csgoStats.rewardStatistics.map((item) => item.amount),
                countStatistics: csgoStats.countStatistics.map((item) => item.count),
            },
        });
    };

    _selectActiveTab = (e) => {
        const { id } = e.target;
        const { fetchHistoryAsync } = this.props;

        fetchHistoryAsync();

        Analytics.event('History tab click', { category: id });

        this.setState({
            active: id,
        });
    };

    render() {
        const { active, dotaStats, lolStats, csgoStats, fortniteStats } = this.state;
        const { history, rewardStatistics } = this.props;

        const userStatsByGame = rewardStatistics.toArray().map((item) => ({
            day: new Date(item.get('dayStart')).toLocaleString('en-us', {
                day: 'numeric',
                month: 'short',
            }),
            Earned: item.get('amount'),
        }));

        //* formatting data about amount of games played to pass into chart
        const gamesPlayed = [
            {
                name: 'DOTA 2',
                value: dotaStats.countStatistics.reduce((a, b) => a + b),
            },
            {
                name: 'League of Legends',
                value: lolStats.countStatistics.reduce((a, b) => a + b),
            },
            {
                name: 'Fortnite',
                value: fortniteStats.countStatistics.reduce((a, b) => a + b),
            },
            {
                name: 'CS:GO',
                value: csgoStats.countStatistics.reduce((a, b) => a + b),
            },
        ];

        //* formatting data about amount of buff coins earned to pass into chart
        const coinsEarned = [
            {
                name: 'DOTA 2',
                value: Number(dotaStats.rewardStatistics.reduce((a, b) => a + b).toFixed(2)),
            },
            {
                name: 'League of Legends',
                value: Number(lolStats.rewardStatistics.reduce((a, b) => a + b).toFixed(2)),
            },
            {
                name: 'Fortnite',
                value: Number(fortniteStats.rewardStatistics.reduce((a, b) => a + b).toFixed(2)),
            },
            {
                name: 'CS:GO',
                value: Number(csgoStats.rewardStatistics.reduce((a, b) => a + b).toFixed(2)),
            },
        ];

        return (
            <ErrorCatcher>
                <div className={Styles.container}>
                    <div className={Styles.switchButtonsContainer}>
                        <div
                            onClick={this._selectActiveTab}
                            id="statistics"
                            className={`${Styles.switchButton} ${
                                active === 'statistics' ? Styles.active : null
                            }`}
                        >
                            Statistics
                        </div>
                        <div
                            onClick={this._selectActiveTab}
                            id="transactions"
                            className={`${Styles.switchButton} ${
                                active === 'transactions' ? Styles.active : null
                            }`}
                        >
                            Transactions
                        </div>
                    </div>

                    {active === 'transactions' ? (
                        <div className={Styles.transactionsContainer}>
                            <TableRow header fields={headerFields} />
                            <div className={Styles.historyData}>
                                {history.get('history').map((item, index) => (
                                    <TableRow
                                        fields={[
                                            {
                                                value:
                                                    item.get('type') === 4
                                                        ? 'Fraud'
                                                        : item.get('type') === 5
                                                        ? 'Bonus'
                                                        : item.get('type') === 3
                                                        ? 'Market'
                                                        : 'Game',
                                            },

                                            {
                                                value: item.get('createdAt').slice(0, 10),
                                            },
                                            {
                                                value: item.get('name') || 'Unknown game',
                                            },
                                            { value: Number(item.get('amount')) },
                                        ]}
                                        key={index}
                                        type={item.get('type')}
                                        isConfirmed={item.get('isConfirmed')}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={Styles.statsContainer}>
                            <p className={Styles.firstTitle}>Your earnings</p>
                            <div className={Styles.firstChart}>
                                <UserStatsByGame data={userStatsByGame} />
                            </div>
                            <p className={Styles.secondTitle}>BUFF coins earned per game</p>
                            <div className={Styles.secondChart}>
                                <BuffEarnedChart data={coinsEarned} />
                            </div>
                            <p className={Styles.thirdTitle}>Games played</p>
                            <div className={Styles.thirdChart}>
                                <TimeSpentChart data={gamesPlayed} />
                            </div>
                        </div>
                    )}
                    <HistoryInstruments activeTab={active} />
                </div>
            </ErrorCatcher>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(History);
