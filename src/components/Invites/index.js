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
                <div className={Styles.earningsContainer}>
                    <p>Earn for each friend:</p>
                    <p className={Styles.coins}>
                        <img src={coin} alt="" />
                        150 BUFF coins
                    </p>
                </div>
                <button className={Styles.button}>Invite</button>
            </div>
        );
    }
}
