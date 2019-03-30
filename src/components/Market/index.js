//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import MarketInstruments from '../MarketInstruments';
import MarketItem from '../MarketItem';
import UserItem from '../UserItem';

//Instruments

//Styles
import Styles from './styles.module.scss';

//Actions
import { marketActions } from '../../bus/market/actions';

//Analytics
import { Analytics } from '../../analytics';

//Redux connect
const mapStateToProps = (state) => ({
    market: state.market,
});

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
        sortByPrice: '',
    };

    componentDidMount() {
        const { fetchMarketItemsAsync } = this.props;
        fetchMarketItemsAsync();
    }

    _sortByPrice = (value) => {
        this.setState({
            sortByPrice: value,
        });
    };

    _selectActiveTab = (e) => {
        const { id } = e.target;
        const { fetchMarketItemsAsync, fetchUserItemsAsync } = this.props;

        // refreshing tab content to be up to date
        if (id === 'market') {
            fetchMarketItemsAsync();
        } else {
            fetchUserItemsAsync();
        }

        Analytics.event('Market tab click', { category: id });

        this.setState({
            active: id,
        });
    };

    render() {
        const { active, sortByPrice } = this.state;
        const { market } = this.props;

        const sortedMarketItems =
            market.get('market').size > 0
                ? market.get('market').sort((a, b) => {
                      switch (sortByPrice) {
                          case 'Low to high':
                              return +a.get('price') - +b.get('price');

                          case 'High to low':
                              return +b.get('price') - +a.get('price');

                          default:
                              return 0;
                      }
                  })
                : [];

        const sortedUserItems =
            market.get('user').size > 0
                ? market.get('user').sort((a, b) => +a.get('price') - +b.get('price'))
                : [];

        return (
            <div className={Styles.container}>
                <div className={Styles.switchButtonsContainer}>
                    <div
                        onClick={this._selectActiveTab}
                        id="market"
                        className={`${Styles.switchButton} ${
                            active === 'market' ? Styles.active : null
                        }`}
                    >
                        Marketplace
                    </div>
                    <div
                        onClick={this._selectActiveTab}
                        id="inventory"
                        className={`${Styles.switchButton} ${
                            active === 'inventory' ? Styles.active : null
                        }`}
                    >
                        My Inventory
                    </div>
                </div>
                <div className={Styles.itemsContainer}>
                    {active === 'market' &&
                        sortedMarketItems.map((item, index) => (
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
                                isGoal={item.get('isGoal')}
                                marginTop={'1.25rem'}
                                key={index}
                            />
                        ))}
                    {active === 'inventory' &&
                        sortedUserItems.map((item, index) => (
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
                        ))}
                </div>
                <MarketInstruments activeTab={active} sortByPrice={this._sortByPrice} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Market);
