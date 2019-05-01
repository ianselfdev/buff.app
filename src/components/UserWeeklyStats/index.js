//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { UserWeeklyChart } from '../_charts/UserWeeklyChart';

//Actions
import { statisticsActions } from '../../bus/app/statistics/actions';

const mapStateToProps = (state) => ({
    rewardStatistics: state.statistics.get('rewardStatistics'),
    countStatistics: state.statistics.get('countStatistics'),
});

const mapDispatchToProps = {
    fetchStatisticsAsync: statisticsActions.fetchStatisticsAsync,
};

class UserWeeklyStats extends Component {
    componentDidMount = () => {
        const { fetchStatisticsAsync } = this.props;

        fetchStatisticsAsync();
    };

    render() {
        const { rewardStatistics } = this.props;

        const arr = rewardStatistics.toArray().slice(-7, rewardStatistics.length);
        const data = arr.map((item) => ({
            day: new Date(item.get('dayStart')).toLocaleString('en-us', { weekday: 'short' }),
            Earned: item.get('amount'),
        }));

        return (
            <div className={Styles.container}>
                <UserWeeklyChart data={data} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserWeeklyStats);
