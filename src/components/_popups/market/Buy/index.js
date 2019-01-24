//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//Actions
import { marketActions } from '../../../../bus/market/actions';

const mapDispatchToProps = {
    buyItemAsync: marketActions.buyItemAsync,
};

class Buy extends Component {
    _handleBuyItem = () => {
        const { id, buyItemAsync } = this.props;

        buyItemAsync(id);
    };

    render() {
        const { closeModal, name, description, price } = this.props;

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
