//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';
import logo from '../../theme/assets/Logo_nav.png';

//Components
import Buy from '../_popups/market/Buy';
import Success from '../_popups/market/Success';
import Error from '../_popups/market/Error';

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
        showModal: false,
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
        const {
            price,
            name,
            errorMarketLabel,
            successPurchaseLabel,
            errorMessage,
            img,
            expire,
        } = this.props;

        const expiresIn = (
            Math.abs(new Date(expire).getTime() - new Date()) /
            1000 /
            60 /
            60 /
            24
        ).toFixed();

        return (
            <Fragment>
                <div className={Styles.container} onClick={this._openModal}>
                    <div className={Styles.priceContainer}>
                        <img className={Styles.gameLogo} src={logo} alt="logo" />
                        <p>
                            <img src={coin} alt="coin" />
                            {price}
                        </p>
                    </div>
                    <div
                        className={Styles.infoContainer}
                        style={{
                            backgroundImage: `url(${img ||
                                'https://i1.wp.com/static-cdn.jtvnw.net/ttv-boxart/Dota%202.jpg?resize=720%2C960&ssl=1'})`,
                        }}
                    >
                        <div className={Styles.label}>
                            <p className={Styles.labelTitle}>Expires in:</p>
                            {/* getting amount of days */}
                            <p className={Styles.timer}>{`${expiresIn} day${
                                expiresIn === 1 ? '' : 's'
                            }`}</p>
                        </div>
                        <div className={Styles.info}>
                            <p className={Styles.itemName}>{name}</p>
                            <p className={Styles.itemName}>{'Line 2 Category'}</p>
                            <button className={Styles.actionButton} onClick={this._openModal}>
                                REDEEM
                            </button>
                        </div>
                    </div>
                </div>
                {showModal && <Buy closeModal={this._closeModal} {...this.props} />}
                {errorMarketLabel && <Error message={errorMessage} />}
                {successPurchaseLabel && <Success />}
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    null,
)(MarketItem);
