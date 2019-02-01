//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { Search } from '@material-ui/icons';

//Components
import ErrorCatcher from '../ErrorCatcher';
import HistoryInstruments from '../HistoryInstruments';
import TableRow from '../TableRow';

//Actions
import { leaderboardActions } from '../../bus/app/leaderboard/actions';

const headerFields = [
    {
        name: 'Name',
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
                                    Recent activity
                                </div>
                            </div>
                            <div className={Styles.searchContainer}>
                                {/* searchboxes are rendered according to active tab
                                and their values are remembered in state, so that user
                                could see what he was last searching, as the filtration
                                results are also being saved in redux */}
                                <input
                                    type="text"
                                    name="leaderboardSearch"
                                    placeholder="Search..."
                                />
                                <Search className={Styles.searchIcon} />
                            </div>
                        </div>
                        <div className={Styles.leaderboardTab}>
                            <TableRow header fields={headerFields} />
                            <div className={Styles.leaderboardData}>
                                {leaderboard.map((item, index) => (
                                    <TableRow
                                        fields={[
                                            { value: 'Dota 2' },
                                            {
                                                value: 'Past week',
                                            },
                                            {
                                                value: item.get('nickname'),
                                            },
                                            { value: item.get('wins').toString() },
                                            { value: Number(item.get('balance')) },
                                        ]}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <HistoryInstruments />
                </div>
            </ErrorCatcher>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Leaderboard);
