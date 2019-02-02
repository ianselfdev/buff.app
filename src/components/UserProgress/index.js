//Core
import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';
import { UserStatusChart } from '../_charts/UserStatusChart';

const data = [{ x: 'User', y: 750 }, { x: 'Goal', y: 2500 }];

export default class UserProgress extends Component {
    render() {
        return (
            <Fragment>
                <div className={Styles.titleBox}>Your progress</div>
                <div className={Styles.chart}>
                    <UserStatusChart data={data} status="Bronze" />
                </div>
                <div className={Styles.legend}>
                    <div className={Styles.legendDatabox}>
                        <p>Next Level</p>
                        <p>
                            <img src={coin} alt="coins-pic" className={Styles.coinImg} />
                            2500 in 15 days
                        </p>
                    </div>
                    <div className={Styles.legendDatabox}>
                        <p>Your coins</p>
                        <p>
                            <img src={coin} alt="coins-pic" className={Styles.coinImg} />
                            750
                        </p>
                    </div>
                </div>
                <div className={Styles.legendButton}>Get Gold Benefits</div>
            </Fragment>
        );
    }
}
