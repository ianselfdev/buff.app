//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import ErrorCatcher from '../ErrorCatcher';
import LeaderboardInstruments from '../LeaderboardInstruments';
import TableRow from '../TableRow';

//Actions
import { leaderboardActions } from '../../bus/app/leaderboard/actions';

const headerFields = [
    {
        name: 'Rank',
    },
    {
        name: 'Period',
    },
    {
        name: 'Nickname',
    },
    {
        name: 'Wins',
    },
    {
        name: 'Buff earned',
    },
];

const mapStateToProps = (state) => ({
    leaderboard: state.leaderboard,
});

const mapDispatchToProps = {
    fetchLeadersDotaAsync: leaderboardActions.fetchLeadersDotaAsync,
};

class Leaderboard extends Component {
    componentDidMount = () => {
        const { fetchLeadersDotaAsync } = this.props;

        fetchLeadersDotaAsync();
    };

    render() {
        const { leaderboard } = this.props;

        return (
            <ErrorCatcher>
                <div className={Styles.mainContainer}>
                    <div className={Styles.leaderboardContainer}>
                        <div className={Styles.controlsContainer}>
                            <div className={Styles.tabsContainer}>
                                <div id="recent" className={`${Styles.tabs} ${Styles.active}`}>
                                    Leaderboard
                                </div>
                            </div>
                        </div>
                        <div className={Styles.leaderboardTab}>
                            <TableRow header fields={headerFields} />
                            <div className={Styles.leaderboardData}>
                                {leaderboard.get('leaders').map((item, index) => (
                                    <TableRow
                                        fields={[
                                            //toString needs to be used to render without coin image
                                            { value: (index + 1).toString() },
                                            {
                                                value: 'Past week',
                                            },
                                            {
                                                value: item.get('login'),
                                            },
                                            { value: item.get('wins').toString() },
                                            { value: Number(item.get('amount')) },
                                        ]}
                                        key={index}
                                        isConfirmed
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <LeaderboardInstruments />
                </div>
            </ErrorCatcher>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Leaderboard);
