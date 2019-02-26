//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import TableRow from '../TableRow';

//Actions
import { historyActions } from '../../bus/app/history/actions';

const mapStateToProps = (state) => ({
    history: state.history,
});

const mapDispatchToProps = {
    fetchHistoryAsync: historyActions.fetchHistoryAsync,
};

class RecentActivity extends Component {
    componentDidMount() {
        const { fetchHistoryAsync } = this.props;
        fetchHistoryAsync();
    }

    render() {
        const { history } = this.props;

        return (
            <Fragment>
                <div className={Styles.titleBox}>Recent Activity</div>
                <div className={Styles.activitiesContainer}>
                    <div className={Styles.historyData}>
                        {history.get('history').map((item, index) => (
                            <TableRow
                                fields={[
                                    { value: item.get('type') === 4 ? 'Fraud' : 'Game' },
                                    {
                                        value: item.get('name') || 'Unknown game',
                                    },
                                    {
                                        value: item.get('data').get('name')
                                            ? item.get('data').get('name')
                                            : item.get('type') === 4
                                            ? 'Unconfirmed'
                                            : `Good job!`,
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
                <div className={Styles.button}>View more</div>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RecentActivity);
