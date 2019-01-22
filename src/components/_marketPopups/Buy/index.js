//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//REST
import { Api } from '../../../REST';

export default class Buy extends Component {
    _handleBuyItem = async () => {
        const { id } = this.props;

        try {
            const response = await Api.market.buyItem(id);
            const data = await response.json();

            console.log(data);

            if (response.status !== 200) {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { closeModal } = this.props;

        return (
            <div className={Styles.bg} onClick={closeModal}>
                <div className={Styles.container}>
                    <p className={Styles.title}>Name of the Item</p>
                    <img
                        src="https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/dd/Cosmetic_icon_Bloodstone_of_the_Precursor.png"
                        alt="img"
                    />
                    <p className={Styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet
                        pulvinar magna at efficitur. Sed eget massa ut libero semper pretium. Nunc
                        id risus eget est gravida viverra imperdiet in nisl. Aenean non porttitor
                        mi, eu consectetur urna. Sed egestas imperdiet molestie. Aliquam cursus
                        ullamcorper mauris. Aliquam id hendrerit tellus, vitae hendrerit lectus.
                        Donec congue, nisl vestibulum auctor tincidunt, augue neque ornare ex,
                        euismod iaculis quam velit ac sem. Aenean egestas quis nulla a luctus.
                    </p>
                    <div className={Styles.numbersContainer}>
                        <div className={Styles.price}>500</div>
                        <div className={Styles.amount}>500 pcs</div>
                    </div>
                    <div className={Styles.buttonContainer}>
                        <div className={Styles.closeButton} onClick={closeModal}>
                            CLOSE
                        </div>
                        <div className={Styles.buyButton} onClick={this._handleBuyItem}>
                            BUY
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
