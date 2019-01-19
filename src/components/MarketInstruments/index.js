//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class MarketInstruments extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <div className={Styles.filtersContainer}>
                    <div className={Styles.title}>Show results for</div>
                    <div className={Styles.filter}>By Game</div>
                    <div className={Styles.filter}>By Amount</div>
                    <div className={Styles.filter}>By Type</div>
                </div>
                <div className={Styles.adContainer} />
            </div>
        );
    }
}
