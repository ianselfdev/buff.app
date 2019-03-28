//Core
import React, { Component } from 'react';

//Instruments
import coin from '../../../../theme/svg/coin.svg';
import star from '../../../../theme/svg/star.svg';
import close from '../../../../theme/svg/close.svg';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//REST
import { Api } from '../../../../REST/api';

//Actions
import { marketActions } from '../../../../bus/market/actions';

//Analytics
import { Analytics } from '../../../../analytics';

const mapDispatchToProps = {
    buyItemAsync: marketActions.buyItemAsync,
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
};

class Buy extends Component {
    _handleBuyItem = (e) => {
        const { id, buyItemAsync, closeModal } = this.props;

        Analytics.event('Item purchase', { category: id });
        buyItemAsync(id);
        closeModal();
    };

    _handleSetGoalItem = () => {
        const { id, fetchMarketItemsAsync } = this.props;

        Api.market.setGoalItem(id);
        fetchMarketItemsAsync();
    };

    render() {
        const {
            closeModal,
            name,
            description,
            price,
            img,
            expire,
            shortDescription,
            isGoal,
        } = this.props;

        const expiresIn = (Math.abs(new Date(expire).getTime() - new Date()) / 1000 / 60).toFixed();

        return (
            <div className={Styles.bg}>
                <div
                    className={`${Styles.star} ${isGoal ? Styles.isFavorite : null}`}
                    onClick={this._handleSetGoalItem}
                >
                    <img src={star} alt="" />
                </div>
                <img src={close} alt="" className={Styles.close} onClick={closeModal} />
                <div className={Styles.container}>
                    <img src={img} alt="" className={Styles.itemImage} />
                    <p className={Styles.description}>{description}</p>
                    <p className={Styles.name}>{name}</p>
                    <div className={Styles.shortDescription}>
                        <img alt="" />
                        <p>{shortDescription}</p>
                    </div>
                    <div className={Styles.priceContainer}>
                        <div className={Styles.price}>
                            <img src={coin} alt="" />
                            {price}
                        </div>
                        <button onClick={this._handleBuyItem}>Buy</button>
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
