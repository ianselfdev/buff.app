//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import Select from '../Select';

//Actions
import { marketActions } from '../../bus/market/actions';
import { advertisementActions } from '../../bus/app/advertisements/actions';

//Redux connect
const mapStateToProps = (state) => ({
    advertisements: state.advertisements,
});

const mapDispatchToProps = {
    filterMarketItemsAsync: marketActions.filterMarketItemsAsync,
    filterUserItemsAsync: marketActions.filterUserItemsAsync,
    removeMarketFilterParameterAsync: marketActions.removeMarketFilterParameterAsync,
    createAdInstanceAsync: advertisementActions.createAdInstanceAsync,
};

class MarketInstruments extends Component {
    state = {
        marketSearch: '',
        userSearch: '',
    };

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

    _filterByGame = (value) => {
        const id =
            value === 'DOTA 2'
                ? 'dota'
                : value === 'League of Legends'
                ? 'lol'
                : value === 'Fortnite'
                ? 'fortnite'
                : value === 'CS:GO'
                ? 'csgo'
                : 'none';
        const {
            filterMarketItemsAsync,
            filterUserItemsAsync,
            removeMarketFilterParameterAsync,
        } = this.props;

        if (id === 'none') {
            removeMarketFilterParameterAsync('game');
        } else {
            filterMarketItemsAsync('game', id);
            filterUserItemsAsync('game', id);
        }
    };

    //handling searchboxes changes
    _handleChange = (e) => {
        const { value, name } = e.target;
        const { removeMarketFilterParameterAsync } = this.props;

        //check when user clears search field
        if (value.length === 0) {
            removeMarketFilterParameterAsync('name');
        }

        this.setState({
            [name]: value,
        });
    };

    //performig filter request with search query on Enter hit
    _handleSearch = async (e) => {
        const { key } = e;
        const { filterMarketItemsAsync, filterUserItemsAsync } = this.props;
        const { active, marketSearch, userSearch } = this.state;

        if (key === 'Enter') {
            if (active === 'market') {
                filterMarketItemsAsync('name', marketSearch);
            } else {
                filterUserItemsAsync('name', userSearch);
            }
        } else {
            return null;
        }
    };

    render() {
        const { userSearch, marketSearch } = this.state;
        const { activeTab, sortByPrice } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.filtersContainer}>
                    {activeTab === 'market' ? (
                        <input
                            type="text"
                            name="marketSearch"
                            placeholder="Search"
                            onKeyDown={this._handleSearch}
                            onChange={this._handleChange}
                            value={marketSearch}
                            className={Styles.searchBar}
                        />
                    ) : (
                        <input
                            type="text"
                            name="userSearch"
                            placeholder="Search"
                            onKeyDown={this._handleSearch}
                            onChange={this._handleChange}
                            value={userSearch}
                            className={Styles.searchBar}
                        />
                    )}
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
                        styles={{
                            height: 50,
                        }}
                    />
                    <Select
                        data={[{ value: 'Gift card' }]}
                        // onChange={this._filterByGame}
                        className={Styles.typeSelect}
                        styles={{
                            height: 50,
                        }}
                    />
                    <Select
                        data={[
                            { value: 'None' },
                            { value: 'Low to high' },
                            { value: 'High to low' },
                        ]}
                        onChange={sortByPrice}
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
