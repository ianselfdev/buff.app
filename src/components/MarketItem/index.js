//Core
import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

//Components
import Buy from '../_marketPopups/Buy';

export default class MarketItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = () => {
        this.setState({
            showModal: true,
        });
    };

    _closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    render() {
        const { showModal } = this.state;

        return (
            <Fragment>
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
                    <button onClick={this._openModal}>REDEEM</button>
                </div>
                {showModal && <Buy closeModal={this._closeModal} />}
            </Fragment>
        );
    }
}
