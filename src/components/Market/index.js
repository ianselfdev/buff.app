//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import MarketInstruments from '../MarketInstruments';
import MarketItem from '../MarketItem';
import UserItem from '../UserItem';

//Instruments
import { Search } from '@material-ui/icons';

//Styles
import Styles from './styles.module.scss';

//Actions
import { marketActions } from '../../bus/market/actions';

//Redux connect
const mapStateToProps = (state) => {
    return {
        market: state.market,
    };
};

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
    filterMarketItemsAsync: marketActions.filterMarketItemsAsync,
    filterUserItemsAsync: marketActions.filterUserItemsAsync,
    removeMarketFilterParameterAsync: marketActions.removeMarketFilterParameterAsync,
};

class Market extends Component {
    state = {
        active: 'market',
        marketSearch: '',
        userSearch: '',
    };

    componentDidMount() {
        const { fetchMarketItemsAsync } = this.props;
        fetchMarketItemsAsync();
    }

    _selectActiveTab = (e) => {
        const { id } = e.target;
        const { fetchMarketItemsAsync, fetchUserItemsAsync } = this.props;

        // refreshing tab content to be up to date
        if (id === 'market') {
            fetchMarketItemsAsync();
        } else {
            fetchUserItemsAsync();
        }

        this.setState({
            active: id,
        });
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
        const { active, userSearch, marketSearch } = this.state;
        const { market } = this.props;

        return (
            <div className={Styles.mainContainer}>
                <div className={Styles.marketContainer}>
                    <div className={Styles.controlsContainer}>
                        <div className={Styles.tabsContainer}>
                            <div
                                onClick={this._selectActiveTab}
                                id="market"
                                className={
                                    active === 'market'
                                        ? `${Styles.tabs} ${Styles.active}`
                                        : Styles.tabs
                                }
                            >
                                Market
                            </div>
                            <div
                                onClick={this._selectActiveTab}
                                id="inventory"
                                className={
                                    active === 'inventory'
                                        ? `${Styles.tabs} ${Styles.active}`
                                        : Styles.tabs
                                }
                            >
                                My Inventory
                            </div>
                        </div>
                        <div className={Styles.searchContainer}>
                            {/* searchboxes are rendered according to active tab
                                    and their values are remembered in state, so that user
                                    could see what he was last searching, as the filtration
                                    results are also being saved in redux */}
                            {active === 'market' ? (
                                <input
                                    type="text"
                                    name="marketSearch"
                                    placeholder="Search..."
                                    onKeyDown={this._handleSearch}
                                    onChange={this._handleChange}
                                    value={marketSearch}
                                />
                            ) : (
                                <input
                                    type="text"
                                    name="userSearch"
                                    placeholder="Search..."
                                    onKeyDown={this._handleSearch}
                                    onChange={this._handleChange}
                                    value={userSearch}
                                />
                            )}
                            <Search className={Styles.searchIcon} />
                        </div>
                    </div>
                    <div className={Styles.marketTab}>
                        {/* items are rendered according to active tab,
                                object are gotten from redux for each tab separately.
                                Also, if no items in inventory or (OMG) on the marketplace - 
                                fallback markdown is rendered */}
                        {active === 'market' && market.get('market').size > 0 ? (
                            market
                                .get('market')
                                .map((item, index) => (
                                    <MarketItem
                                        shortDescription={item.get('descriptionShort')}
                                        discount={item.get('discount')}
                                        games={item.get('games')}
                                        price={item.get('price')}
                                        name={item.get('name')}
                                        amount={item.get('count')}
                                        id={item.get('id')}
                                        tradable={item.get('tradable')}
                                        description={item.get('description')}
                                        expire={item.get('expire')}
                                        img={item.get('img')}
                                        key={index}
                                    />
                                ))
                        ) : active === 'inventory' && market.get('user').size > 0 ? (
                            market
                                .get('user')
                                .map((item, index) => (
                                    <UserItem
                                        shortDescription={item.get('descriptionShort')}
                                        description={item.get('description')}
                                        games={item.get('games')}
                                        name={item.get('name')}
                                        id={item.get('id')}
                                        img={item.get('img')}
                                        tradable={item.get('tradable')}
                                        key={index}
                                    />
                                ))
                        ) : (
                            <p className={Styles.empty}>Nothing here yet :(</p>
                        )}
                    </div>
                </div>
                <MarketInstruments />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Market);
