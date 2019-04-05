//Core
import React, { Component } from 'react';

//Instruments
import coin from '../../../../theme/svg/coin.svg';
import star from '../../../../theme/svg/star.svg';
import close from '../../../../theme/svg/close.svg';
import logo from '../../../../theme/svg/logo-short.svg';
import { notifications } from '../../../_notifications';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//REST
import { Api } from '../../../../REST/api';

//Actions
import { marketActions } from '../../../../bus/market/actions';

//Analytics
import { Analytics } from '../../../../analytics';

const mapStateToProps = (state) => ({
    email: state.profile.get('email'),
    login: state.profile.get('login'),
    buffId: state.profile.get('buffId'),
});

const mapDispatchToProps = {
    buyItemAsync: marketActions.buyItemAsync,
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
};

class Buy extends Component {
    _handleBuyItem = (e) => {
        const { id, name, price, buyItemAsync, closeModal, email, login, buffId } = this.props;

        if (localStorage.getItem('demoMode')) {
            return notifications.info(
                'You should quit demo mode and sign up or log in to perform this action.',
            );
        }

        Analytics.userPurchasesItem({ email, login, buffId }, { id, name, price });
        buyItemAsync(id);
        closeModal();
    };

    _handleSetGoalItem = () => {
        const { id, fetchMarketItemsAsync } = this.props;

        Api.market.setGoalItem(id);
        fetchMarketItemsAsync();
    };

    render() {
        const { closeModal, name, description, price, img, shortDescription, isGoal } = this.props;

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
                        <img alt="" src={logo} />
                        <p>{shortDescription}</p>
                    </div>
                    <div className={Styles.priceContainer}>
                        <div className={Styles.price}>
                            <img src={coin} alt="" />
                            {price}
                        </div>
                        <button onClick={this._handleBuyItem}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Buy);
