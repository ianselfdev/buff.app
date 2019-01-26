//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import Confirmation from '../Confirmation';

//Actions
import { marketActions } from '../../../../bus/market/actions';

const mapDispatchToProps = {
    activateItemAsync: marketActions.activateItemAsync,
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
};

const mapStateToProps = (state) => {
    return {
        giftCode: state.market.get('giftCode'),
    };
};

class Activation extends Component {
    state = {
        showConfirmation: false,
        activated: false,
    };

    _activate = () => {
        const { id, activateItemAsync } = this.props;

        activateItemAsync(id);

        this.setState({
            activated: true,
        });
    };

    _openModal = () => {
        this.setState({
            showConfirmation: true,
        });
    };

    _closeModal = () => {
        this.setState({
            showConfirmation: false,
        });
    };

    render() {
        const { closeModal, name, giftCode } = this.props;
        const { showConfirmation, activated } = this.state;

        return (
            <Fragment>
                <div className={Styles.bg}>
                    <div className={Styles.container}>
                        <p className={Styles.title}>{name}</p>
                        <img
                            src="https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/dd/Cosmetic_icon_Bloodstone_of_the_Precursor.png"
                            alt="img"
                        />
                        {activated ? (
                            <p className={Styles.code}>
                                Your gift card code is: <br />
                                {giftCode}
                            </p>
                        ) : (
                            <p className={Styles.description}>
                                To redeem your code, please, press the buttom 'ACTIVATE' below.
                                <br />
                                <br />
                                Mind that after you activate card and get the code, the card WILL
                                DISAPPEAR and you will not be able to see the code again.
                            </p>
                        )}
                        <div className={Styles.buttonContainer}>
                            <button className={Styles.closeButton} onClick={closeModal}>
                                CLOSE
                            </button>
                            <button
                                className={Styles.buyButton}
                                onClick={this._openModal}
                                disabled={activated}
                            >
                                ACTIVATE
                            </button>
                        </div>
                    </div>
                </div>
                {showConfirmation && (
                    <Confirmation
                        confirm={this._activate}
                        closeModal={this._closeModal}
                        type="giftCard"
                    />
                )}
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Activation);
