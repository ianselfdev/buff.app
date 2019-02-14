//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

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
                                            { value: item.get('type') === 4 ? 'Fraud' : 'Game' },
                                            {
                                                value: item.get('name') || 'Unknown game',
                                            },
                                            {
                                                value:
                                                    item.get('type') === 4
                                                        ? 'You, son of a cheater!'
                                                        : `${
                                                              Number(item.get('amount')) > 10
                                                                  ? 'More than 10 coins! Wow!'
                                                                  : Number(item.get('amount')) > 5
                                                                  ? 'More than 5 coins!'
                                                                  : 'Well, you tried'
                                                          }`,
                                            },
                                            { value: Number(item.get('amount')) },
                                        ]}
                                        key={index}
                                        type={item.get('type')}
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
