//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Actions
import { historyActions } from '../../bus/app/history/actions';

//Redux connect
const mapDispatchToProps = {
    removeHistoryFilterParameterAsync: historyActions.removeHistoryFilterParameterAsync,
    filterHistoryAsync: historyActions.filterHistoryAsync,
};

class HistoryInstruments extends Component {
    state = {
        byPeriod: false,
        byType: false,
        value: 5000,
        type: 'none',
        period: 'none',
    };

    _toggleByPeriod = () => {
        this.setState((prevState) => ({
            byPeriod: !prevState.byPeriod,
        }));
    };

    _toggleByType = () => {
        this.setState((prevState) => ({
            byType: !prevState.byType,
        }));
    };

    _handleTypeChange = (e) => {
        const { id } = e.target;
        const { removeHistoryFilterParameterAsync, filterHistoryAsync } = this.props;
        if (id === 'none') {
            removeHistoryFilterParameterAsync('type');
        } else {
            filterHistoryAsync('type', id);
        }

        this.setState({
            type: id,
        });
    };

    _handlePeriodChange = (e) => {
        const { id } = e.target;
        console.log(id);
        // const { removeHistoryFilterParameterAsync, filterHistoryAsync } = this.props;
        // if (id === 'none') {
        //     removeHistoryFilterParameterAsync('period');
        // } else {
        //     filterHistoryAsync('period', id);
        // }

        this.setState({
            period: id,
        });
    };

    render() {
        const { byPeriod, byType, type, period } = this.state;

        return (
            <div className={Styles.container}>
                <div className={Styles.filtersContainer}>
                    <div className={Styles.title}>Filters</div>
                    <div className={byType ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByType}>By Type</p>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byTypeFilter"
                                id="2"
                                checked={type === '2'}
                                onChange={this._handleTypeChange}
                            />
                            <label htmlFor="2">Game</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byTypeFilter"
                                id="3"
                                checked={type === '3'}
                                onChange={this._handleTypeChange}
                            />
                            <label htmlFor="3">Market</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byTypeFilter"
                                id="4"
                                checked={type === '4'}
                                onChange={this._handleTypeChange}
                            />
                            <label htmlFor="4">Fraud</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byTypeFilter"
                                id="none"
                                checked={type === 'none'}
                                onChange={this._handleTypeChange}
                            />
                            <label htmlFor="none">Show All</label>
                        </div>
                    </div>
                    <div className={byPeriod ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByPeriod}>By Period</p>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byTypeFilter"
                                id="86400000"
                                checked={period === '86400000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="86400000">Past Day</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byPeriodFilter"
                                id="604800000"
                                checked={period === '604800000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="604800000">Past Week</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byPeriodFilter"
                                id="2592000000"
                                checked={period === '2592000000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="2592000000">Past Month</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byPeriodFilter"
                                id="none"
                                checked={period === 'none'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="none">Show All</label>
                        </div>
                    </div>
                </div>
                <div className={Styles.adContainer} />
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(HistoryInstruments);
