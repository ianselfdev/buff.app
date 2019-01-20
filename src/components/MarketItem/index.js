//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class MarketItem extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <div className={Styles.title}>
                    itemname
                    <p className={Styles.description}>
                        Detailed description. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className={Styles.actionButtonContainer}>
                    <p>500₿</p>
                    <p>BUY</p>
                </div>
            </div>
        );
    }
}
