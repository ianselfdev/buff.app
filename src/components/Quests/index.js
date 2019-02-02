//Core
import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';

//!__WARNING___HARDCODED DATA___!!!
const data = [
    { title: 'Share', img: coin, price: 50 },
    { title: 'Play', img: coin, price: 100 },
    { title: 'Invite', img: coin, price: 100 },
    { title: 'Dance', img: coin, price: 50 },
    { title: 'Sing', img: coin, price: 50 },
    { title: 'Quak', img: coin, price: 500 },
];

export default class Quests extends Component {
    render() {
        return (
            <Fragment>
                <div className={Styles.titleBox}>Your BUFF Quests</div>
                <div className={Styles.questsContainer}>
                    {data.map((item, index) => (
                        <div className={Styles.questsItem} key={index}>
                            <p>{item.title}</p>
                            <img src={item.img} alt="img" />
                            <div className={Styles.button}>
                                <img src={coin} alt="coin" />
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    }
}
