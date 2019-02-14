//Core
import React, { Component } from 'react';

//Instruments
import coin from '../../../../theme/assets/coin.png';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//Actions
import { marketActions } from '../../../../bus/market/actions';

//Analytics
import { Analytics } from '../../../../analytics';

const mapDispatchToProps = {
    buyItemAsync: marketActions.buyItemAsync,
};

class Buy extends Component {
    _handleBuyItem = () => {
        const { id, buyItemAsync, closeModal } = this.props;

        Analytics.event('Item purchase', { category: id });
        buyItemAsync(id);
        closeModal();
    };

    render() {
        const { closeModal, name, description, price, img, expire } = this.props;

        const expiresIn = (Math.abs(new Date(expire).getTime() - new Date()) / 1000 / 60).toFixed();

        return (
            <div className={Styles.bg} onClick={closeModal} id="closeModal">
                <div className={Styles.container}>
                    <div className={Styles.priceContainer}>
                        <img
                            className={Styles.gameLogo}
                            src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                            alt="logo"
                        />
                        <p className={Styles.price}>
                            <img className={Styles.coin} src={coin} alt="coin" />
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
                            {/* getting hours and minutes calculated and rendered in the XX:XX format */}
                            <p className={Styles.timer}>{`${(expiresIn / 60)
                                .toFixed()
                                .toString()
                                .padStart(2, '0')}:${(expiresIn % 60)
                                .toString()
                                .padStart(2, '0')}`}</p>
                        </div>
                        <div className={Styles.info}>
                            <p className={Styles.itemName}>{name}</p>
                            <p className={Styles.itemName}>{description}</p>
                            <button className={Styles.actionButton} onClick={this._handleBuyItem}>
                                REDEEM
                            </button>
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
