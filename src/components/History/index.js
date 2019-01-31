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
import { historyActions } from '../../bus/app/history/actions';

//!__WARNING__!!!___HARDCODED DATA____!!!
const headerFields = [
    {
        name: 'Type',
    },
    {
        name: 'Game',
    },
    {
        name: 'Achievements',
    },
    {
        name: 'Buff coins',
    },
];
//!__WARNING__!!!___HARDCODED DATA____!!!
const rowsFields = [
    {
        value: 'Play',
    },
    {
        value: 'Dota 2',
    },
    {
        value: Math.random() > 0.5 ? 'First Blood' : 'Triple Kill',
    },
    {
        value: 50,
    },
];

const mapStateToProps = (state) => ({
    history: state.history,
});

const mapDispatchToProps = {
    fetchHistoryAsync: historyActions.fetchHistoryAsync,
};

class History extends Component {
    state = {};

    componentDidMount() {
        const { fetchHistoryAsync } = this.props;
        fetchHistoryAsync();
    }

    render() {
        return (
            <ErrorCatcher>
                <div className={Styles.mainContainer}>
                    <div className={Styles.historyContainer}>
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
                                <input type="text" name="historySearch" placeholder="Search..." />
                                <Search className={Styles.searchIcon} />
                            </div>
                        </div>
                        <div className={Styles.historyTab}>
                            <TableRow header fields={headerFields} />
                            {/* //!__WARNING__!!!___HARDCODED DATA____!!! */}
                            <TableRow fields={rowsFields} />
                            <TableRow fields={rowsFields} />
                            <TableRow fields={rowsFields} />
                            <TableRow fields={rowsFields} />
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
)(History);
