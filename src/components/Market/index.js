//Core
import React, { Component } from 'react';

//Components
import MarketInstruments from '../MarketInstruments';
import MarketItem from '../MarketItem';

//Instruments
import { Search } from '@material-ui/icons';

//Styles
import Styles from './styles.module.scss';

export default class Market extends Component {
    state = {
        active: 'market',
    };

    _selectActiveTab = (e) => {
        const { id } = e.target;

        this.setState({
            active: id,
        });
    };

    render() {
        const { active } = this.state;

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
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                        <MarketItem marketItem={active === 'market'} />
                    </div>
                </div>
                <MarketInstruments />
            </div>
        );
    }
}
