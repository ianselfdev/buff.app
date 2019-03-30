//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import logo from '../../theme/svg/logo-short.svg';
import coin from '../../theme/svg/coin.svg';
import star from '../../theme/svg/star.svg';
// import csgo_logo from '../../theme/svg/csgo_logo.svg';

//Components
import Buy from '../_popups/market/Buy';

//REST
import { Api } from '../../REST/api';

//Analytics
import { Analytics } from '../../analytics';

//Actions
import { marketActions } from '../../bus/market/actions';

const mapStateToProps = (state) => {
    return {
        successPurchaseLabel: state.ui.get('successPurchaseLabel'),
    };
};

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
};

class MarketItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = (e) => {
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

        Api.market.setGoalItem(id);
        fetchMarketItemsAsync();
    };

    render() {
        const { showModal } = this.state;
        const { price, name, img, shortDescription, marginTop, isGoal } = this.props;

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
                            {price}
                        </div>
                        <div className={Styles.button} onClick={this._openModal}>
                            Buy
                        </div>
                    </div>
                    {showModal && <Buy closeModal={this._closeModal} {...this.props} />}
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketItem);
