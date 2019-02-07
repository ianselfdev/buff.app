//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';

//Components
import Buy from '../_popups/market/Buy';
import Success from '../_popups/market/Success';
import Error from '../_popups/market/Error';

const mapStateToProps = (state) => {
    return {
        errorLabel: state.ui.get('errorLabel'),
        successLabel: state.ui.get('successLabel'),
        errorMessage: state.ui.get('errorMessage'),
    };
};

class MarketItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = () => {
        this.setState({
            showModal: true,
        });
    };

    _closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    render() {
        const { showModal } = this.state;
        const { price, name, errorLabel, successLabel, errorMessage, img } = this.props;

        return (
            <Fragment>
                <div className={Styles.container}>
                    <div className={Styles.priceContainer}>
                        <img
                            className={Styles.gameLogo}
                            src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                            alt="logo"
                        />
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
                        <div className={Styles.label}>label</div>
                        <div className={Styles.info}>
                            <p>{name}</p>
                            <p>{'Line 2 Category'}</p>
                            <button onClick={this._openModal}>REDEEM</button>
                        </div>
                    </div>
                </div>
                {showModal && <Buy closeModal={this._closeModal} {...this.props} />}
                {errorLabel && <Error message={errorMessage} />}
                {successLabel && <Success />}
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    null,
)(MarketItem);
