//Core
import React, { Component } from 'react';

//Styles
// import Styles from './styles.module.scss';
import Styles from './styles1.module.scss';

export default class MarketItem extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <div className={Styles.titleContainer}>
                    <p className={Styles.title}> Itemname </p>
                    <p className={Styles.category}>Level 2 category</p>
                </div>
                <img
                    src="https://d1u5p3l4wpay3k.cloudfront.net/allstars_gamepedia/thumb/b/b8/Epic_Loot_Chest.jpg/300px-Epic_Loot_Chest.jpg"
                    alt="img"
                />
                <div className={Styles.label}>120 left</div>
                <div className={Styles.priceContainer}>
                    <p>500</p>
                    <img
                        src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                        alt="logo"
                    />
                </div>
                <button>REDEEM</button>
            </div>
        );
    }
}
