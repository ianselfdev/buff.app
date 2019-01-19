//Core
import React, { Component } from 'react';

//Components
import MarketInstruments from '../MarketInstruments';
import MarketItem from '../MarketItem';

//Styles
import Styles from './styles.module.scss';

export default class Market extends Component {
    render() {
        return (
            <div className={Styles.mainContainer}>
                <div className={Styles.marketContainer}>
                    <div className={Styles.controlsContainer}>
                        <div className={Styles.tabsContainer}>
                            <div className={Styles.tabs}>Market</div>
                            <div className={Styles.tabs}>My Inventory</div>
                        </div>
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className={Styles.marketTab}>
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                        <MarketItem />
                    </div>
                </div>
                <MarketInstruments />
            </div>
        );
    }
}
