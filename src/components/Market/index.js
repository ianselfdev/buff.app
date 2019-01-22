//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import MarketInstruments from '../MarketInstruments';
import MarketItem from '../MarketItem';

//Instruments
import { Search } from '@material-ui/icons';

//Styles
import Styles from './styles.module.scss';

//Actions
import { marketActions } from '../../bus/market/actions';

const mapStateToProps = (state) => {
    return {
        market: state.market,
    };
};

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
};

class Market extends Component {
    state = {
        active: 'market',
    };

    componentDidMount() {
        const { fetchMarketItemsAsync } = this.props;
        fetchMarketItemsAsync();
    }

    _selectActiveTab = (e) => {
        const { id } = e.target;
        const { fetchMarketItemsAsync, fetchUserItemsAsync } = this.props;

        this.setState({
            active: id,
        });

        if (id === 'market') {
            fetchMarketItemsAsync();
        } else {
            fetchUserItemsAsync();
        }
    };

    render() {
        const { active } = this.state;
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
                            <input type="text" placeholder="Search..." />
                            <Search className={Styles.searchIcon} />
                        </div>
                    </div>
                    <div className={Styles.marketTab}>
                        {market.map((item) => (
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
                                key={item.get('id')}
                            />
                        ))}
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
