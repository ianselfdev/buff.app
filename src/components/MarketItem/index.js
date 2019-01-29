//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

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
        const {
            shortDescription,
            price,
            name,
            amount,
            errorLabel,
            successLabel,
            errorMessage,
            img,
        } = this.props;

        return (
            <Fragment>
                <div className={Styles.container}>
                    <div className={Styles.titleContainer} onClick={this._openModal}>
                        <p className={Styles.title}> {name} </p>
                        <p className={Styles.category}>{shortDescription}</p>
                    </div>
                    <img
                        onClick={this._openModal}
                        src={
                            img ||
                            'https://d1u5p3l4wpay3k.cloudfront.net/allstars_gamepedia/thumb/b/b8/Epic_Loot_Chest.jpg/300px-Epic_Loot_Chest.jpg'
                        }
                        alt="img"
                    />
                    <div className={Styles.label}>{amount} left</div>
                    <div className={Styles.priceContainer}>
                        <p>{price}</p>
                        <img
                            src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                            alt="logo"
                        />
                    </div>
                    <button onClick={this._openModal}>REDEEM</button>
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
