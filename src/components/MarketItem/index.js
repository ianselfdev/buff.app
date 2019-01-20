//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class MarketItem extends Component {
    render() {
        const { marketItem } = this.props;

        return (
            <div className={Styles.container}>
                <div className={Styles.title}>
                    itemname
                    <p className={Styles.description}>
                        Detailed description. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div
                    className={
                        marketItem
                            ? Styles.actionButtonContainerBuy
                            : Styles.actionButtonContainerSell
                    }
                >
                    <p>500₿</p>
                    <p>{marketItem ? 'BUY' : 'SELL'}</p>
                </div>
            </div>
        );
    }
}
