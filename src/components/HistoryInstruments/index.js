//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import Select from '../Select';

//Actions
import { historyActions } from '../../bus/app/history/actions';
import { advertisementActions } from '../../bus/app/advertisements/actions';

//Redux connect
const mapStateToProps = (state) => ({
    advertisements: state.advertisements,
});

const mapDispatchToProps = {
    removeHistoryFilterParameterAsync: historyActions.removeHistoryFilterParameterAsync,
    filterHistoryAsync: historyActions.filterHistoryAsync,
    createAdInstanceAsync: advertisementActions.createAdInstanceAsync,
};

class MarketInstruments extends Component {
    componentDidMount = () => {
        const { createAdInstanceAsync, advertisements } = this.props;

        //fallback
        if (advertisements.refreshAd) {
            advertisements.refreshAd();
        } else {
            createAdInstanceAsync(document.getElementById('ad-div'));
        }
    };

    componentWillUnmount = () => {
        const { advertisements } = this.props;

        //fallback
        if (advertisements.refreshAd) {
            advertisements.removeAd();
        }
    };

    _filterByGame = (game) => {
        const { removeHistoryFilterParameterAsync, filterHistoryAsync } = this.props;

        const id =
            game === 'DOTA 2'
                ? 7314
                : game === 'League of Legends'
                ? 5426
                : game === 'Fortnite'
                ? 21216
                : game === 'CS:GO'
                ? 7764
                : 'none';

        if (id === 'none') {
            removeHistoryFilterParameterAsync('gameId');
        } else {
            filterHistoryAsync('gameId', id);
        }
    };

    _filterByType = (type) => {
        const { removeHistoryFilterParameterAsync, filterHistoryAsync } = this.props;

        const id = type === 'Game' ? 2 : type === 'Market' ? 3 : type === 'Bonus' ? 5 : 'none';

        if (id === 'none') {
            removeHistoryFilterParameterAsync('type');
        } else {
            filterHistoryAsync('type', id);
        }
    };

    _filterByPeriod = (period) => {
        const { removeHistoryFilterParameterAsync, filterHistoryAsync } = this.props;

        const id =
            period === 'Last day'
                ? 86400000
                : period === 'Last week'
                ? 604800000
                : period === 'Last month'
                ? 2592000000
                : 'none';

        if (id === 'none') {
            removeHistoryFilterParameterAsync('period');
        } else {
            filterHistoryAsync('period', id);
        }
    };

    render() {
        const { activeTab } = this.props;

        return (
            <div
                className={Styles.container}
                style={{ marginTop: activeTab === 'statistics' ? 30 : 0 }}
            >
                <div className={Styles.filtersContainer}>
                    <Select
                        data={[
                            { value: 'Show all' },
                            { value: 'DOTA 2' },
                            { value: 'League of Legends' },
                            { value: 'Fortnite' },
                            { value: 'CS:GO' },
                        ]}
                        onChange={this._filterByGame}
                        className={Styles.gameSelect}
                        title="Filter by game"
                        styles={{
                            height: 50,
                        }}
                    />
                    <Select
                        data={[
                            { value: 'Show all' },
                            { value: 'Game' },
                            { value: 'Market' },
                            { value: 'Bonus' },
                        ]}
                        onChange={this._filterByType}
                        className={Styles.typeSelect}
                        title="Filter by type"
                        styles={{
                            height: 50,
                        }}
                        disabled={activeTab === 'statistics'}
                    />
                    <Select
                        data={[
                            { value: 'Show all' },
                            { value: 'Last day' },
                            { value: 'Last week' },
                            { value: 'Last month' },
                        ]}
                        onChange={this._filterByPeriod}
                        title="Filter by period"
                        className={Styles.priceSort}
                        styles={{
                            height: 50,
                        }}
                    />
                </div>
                <div className={Styles.adContainer} id="ad-div" />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketInstruments);
