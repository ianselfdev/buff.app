//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';

export default class DailyBonus extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <p className={Styles.text}>You may get your next bonus after:</p>
                <div className={Styles.timer}>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>12</p>
                        <p className={Styles.timerText}>Hrs</p>
                    </div>
                    <span>:</span>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>12</p>
                        <p className={Styles.timerText}>Min</p>
                    </div>
                    <span>:</span>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>12</p>
                        <p className={Styles.timerText}>Sec</p>
                    </div>
                </div>
                <button className={Styles.button}>
                    <img src={coin} alt="" />
                    10
                </button>
            </div>
        );
    }
}
