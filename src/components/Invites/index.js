//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';

export default class Invites extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <p className={Styles.text}>Invite you friends to earn more Buff coins!</p>
                <div className={Styles.earningsContainer}>
                    <p>You earned:</p>
                    <p className={Styles.coins}>
                        <img src={coin} alt="" />
                        150
                    </p>
                </div>
                <button className={Styles.button}>Invite</button>
            </div>
        );
    }
}
