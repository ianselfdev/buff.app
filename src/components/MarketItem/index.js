//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class MarketItem extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <div className={Styles.title}>itemname</div>
                <div className={Styles.actionButtonContainer}>
                    <p>500₿</p>
                    <p>BUY</p>
                </div>
            </div>
        );
    }
}
