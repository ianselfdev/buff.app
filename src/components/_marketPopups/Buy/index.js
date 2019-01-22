//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//REST
import { Api } from '../../../REST';

//Actions
import { marketActions } from '../../../bus/market/actions';

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
};

class Buy extends Component {
    _handleBuyItem = async () => {
        const { fetchMarketItemsAsync, fetchUserItemsAsync } = this.props;
        const { id } = this.props;

        try {
            const response = await Api.market.buyItem(id);
            const data = await response.json();

            console.log(data);

            if (response.status !== 200) {
                throw new Error(data.error);
            }

            fetchMarketItemsAsync();
            fetchUserItemsAsync();
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { closeModal, name, description, price } = this.props;
        console.log(this.props);

        return (
            <div className={Styles.bg} onClick={closeModal}>
                <div className={Styles.container}>
                    <p className={Styles.title}>{name}</p>
                    <img
                        src="https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/dd/Cosmetic_icon_Bloodstone_of_the_Precursor.png"
                        alt="img"
                    />
                    <p className={Styles.description}>{description}</p>
                    <div className={Styles.numbersContainer}>
                        <div className={Styles.price}>{price}</div>
                        <div className={Styles.amount}>1 pcs</div>
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

export default connect(
    null,
    mapDispatchToProps,
)(Buy);
