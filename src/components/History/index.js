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

const headerFields = [
    {
        name: 'Type',
    },
    {
        name: 'Game Name',
    },
    {
        name: 'Achievements',
    },
    {
        name: 'Buff coins',
    },
];

const mapStateToProps = (state) => ({
    history: state.history,
});

const mapDispatchToProps = {
    fetchHistoryAsync: historyActions.fetchHistoryAsync,
};

class History extends Component {
    componentDidMount() {
        const { fetchHistoryAsync } = this.props;
        fetchHistoryAsync();
    }

    render() {
        const { history } = this.props;

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
                        </div>
                        <div className={Styles.historyTab}>
                            <TableRow header fields={headerFields} />
                            <div className={Styles.historyData}>
                                {history.get('history').map((item, index) => (
                                    <TableRow
                                        fields={[
                                            { value: 'Play' },
                                            {
                                                value: item.get('name') || 'Unknown game',
                                            },
                                            { value: 'Wow!' },
                                            { value: Number(item.get('amount')) },
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
)(History);
