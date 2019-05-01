//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../theme/svg/logo-short.svg';
import coin from '../../theme/svg/coin.svg';
import star from '../../theme/svg/star.svg';
import { notifications } from '../_notifications';

//Components
import Buy from '../_popups/market/Buy';

//REST
import { Api } from '../../REST/api';

//Analytics
import { Analytics } from '../../analytics';

//Actions
import { marketActions } from '../../bus/market/actions';

const mapStateToProps = (state) => ({
    successPurchaseLabel: state.ui.get('successPurchaseLabel'),
    balance: state.profile.get('balance'),
});

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
};

class MarketItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = () => {
        const { id } = this.props;
        Analytics.event('Market item details opened', { category: id });
        this.setState({
            showModal: true,
        });
    };

    _closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    _handleSetGoalItem = () => {
        const { id, fetchMarketItemsAsync } = this.props;

        if (localStorage.getItem('demoMode')) {
            return notifications.info(
                'You should quit demo mode and sign up or log in to perform this action.',
            );
        }

        Api.market.setGoalItem(id);
        fetchMarketItemsAsync();
    };

    render() {
        const { showModal } = this.state;
        const {
            price,
            name,
            img,
            shortDescription,
            marginTop,
            isGoal,
            discount,
            balance,
        } = this.props;

        const priceWithDiscount = ((price * (100 - +discount)) / 100).toFixed(2);
        const amountOfCoinsUserAlreadyHas = (+balance / +priceWithDiscount) * 100;

        return (
            <>
                <div
                    className={`${Styles.container} ${isGoal ? Styles.isFavoriteContainer : null}`}
                    style={{ marginTop: marginTop || 0 }}
                >
                    <div
                        className={`${Styles.favoriteButton} ${
                            isGoal ? Styles.isFavoriteButton : null
                        }`}
                        onClick={this._handleSetGoalItem}
                    >
                        <img src={star} alt="" />
                    </div>
                    <img className={Styles.itemImg} src={img} alt="" onClick={this._openModal} />
                    <p className={Styles.title} onClick={this._openModal}>
                        {name}
                    </p>
                    <div className={Styles.itemInfo}>
                        <img src={logo} alt="" />
                        <p>{shortDescription}</p>
                    </div>
                    <div className={Styles.actionsContainer}>
                        <div className={Styles.price}>
                            <img src={coin} alt="" />
                            {priceWithDiscount}
                        </div>
                        {+amountOfCoinsUserAlreadyHas.toFixed(0) < 100 ? (
                            <div className={Styles.insufficientFunds}>
                                <div
                                    className={Styles.progress}
                                    style={{
                                        width: `${Math.max(
                                            +amountOfCoinsUserAlreadyHas.toFixed(0),
                                            1,
                                        )}%`,
                                    }}
                                >
                                    {Math.max(amountOfCoinsUserAlreadyHas.toFixed(0), 1)}%
                                </div>
                            </div>
                        ) : (
                            <div className={Styles.button} onClick={this._openModal}>
                                Buy
                            </div>
                        )}
                    </div>
                    {showModal && (
                        <Buy
                            closeModal={this._closeModal}
                            amountOfCoinsUserAlreadyHas={amountOfCoinsUserAlreadyHas}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketItem);
