//Core
import React, { Component } from 'react';

//Instruments
import coin from '../../../../theme/svg/coin.svg';
import star from '../../../../theme/svg/star.svg';

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
    _handleBuyItem = (e) => {
        const { id, buyItemAsync, closeModal } = this.props;

        Analytics.event('Item purchase', { category: id });
        buyItemAsync(id);
        closeModal(e);
    };

    render() {
        const { closeModal, name, description, price, img, expire, shortDescription } = this.props;

        //!___hardcoded data
        const favorite = false;

        const expiresIn = (Math.abs(new Date(expire).getTime() - new Date()) / 1000 / 60).toFixed();

        return (
            <div className={Styles.bg} onClick={closeModal} id="closeModal">
                <div className={`${Styles.star} ${favorite ? Styles.isFavorite : null}`}>
                    <img src={star} alt="" />
                </div>
                <div className={Styles.container}>
                    <img src={img} alt="" className={Styles.itemImage} />
                    <p className={Styles.description}>{description}</p>
                    <p className={Styles.name}>{name}</p>
                    <div className={Styles.shortDescription}>
                        <img />
                        <p>{shortDescription}</p>
                    </div>
                    <div className={Styles.priceContainer}>
                        <div className={Styles.price}>
                            <img src={coin} alt="" />
                            {price}
                        </div>
                        <button>Buy</button>
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
