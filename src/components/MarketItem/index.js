//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/svg/coin.svg';
import star from '../../theme/svg/star.svg';
import csgo_logo from '../../theme/svg/csgo_logo.svg';

//Components
import Buy from '../_popups/market/Buy';

//Analytics
import { Analytics } from '../../analytics';

const mapStateToProps = (state) => {
    return {
        errorMarketLabel: state.ui.get('errorMarketLabel'),
        successPurchaseLabel: state.ui.get('successPurchaseLabel'),
        errorMessage: state.ui.get('errorMessage'),
    };
};

class MarketItem extends Component {
    state = {
        showModal: true,
    };

    _openModal = () => {
        const { id } = this.props;
        Analytics.event('Market item details opened', { category: id });
        this.setState({
            showModal: true,
        });
    };

    _closeModal = (e) => {
        if (e.target.id === 'closeModal') {
            this.setState({
                showModal: false,
            });
        }
    };

    render() {
        const { showModal } = this.state;
        const { price, name, img, expire, shortDescription, marginTop, favorite } = this.props;

        const expiresIn = (
            Math.abs(new Date(expire).getTime() - new Date()) /
            1000 /
            60 /
            60 /
            24
        ).toFixed();

        return (
            <>
                <div
                    className={`${Styles.container} ${
                        favorite ? Styles.isFavoriteContainer : null
                    }`}
                    onClick={this._openModal}
                    style={{ marginTop: marginTop || 0 }}
                >
                    <div
                        className={`${Styles.favoriteButton} ${
                            favorite ? Styles.isFavoriteButton : null
                        }`}
                    >
                        <img src={star} alt="" />
                    </div>
                    <img className={Styles.itemImg} src={img} alt="" />
                    <p className={Styles.title}>{name}</p>
                    <div className={Styles.itemInfo}>
                        <img src={csgo_logo} alt="" />
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
    null,
)(MarketItem);
