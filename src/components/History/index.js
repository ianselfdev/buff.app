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
    };

    componentDidMount() {
        const { fetchHistoryAsync, fetchStatisticsAsync } = this.props;

        fetchHistoryAsync();
        fetchStatisticsAsync();
    }

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
        const { active } = this.state;
        const { history, rewardStatistics } = this.props;

        const userStatsByGame = rewardStatistics.toArray().map((item) => ({
            day: new Date(item.get('dayStart')).toLocaleString('en-us', {
                day: 'numeric',
                month: 'short',
            }),
            Earned: item.get('amount'),
        }));

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
                                <BuffEarnedChart />
                            </div>
                            <p className={Styles.thirdTitle}>Games played</p>
                            <div className={Styles.thirdChart}>
                                <TimeSpentChart />
                            </div>
                        </div>
                    )}
                    <HistoryInstruments activeTab={active} sortByPrice={this._sortByPrice} />
                </div>
            </ErrorCatcher>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(History);
