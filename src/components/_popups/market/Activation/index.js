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
        const { closeModal, name, giftCode, img, description } = this.props;
        const { showConfirmation, activated } = this.state;

        return (
            <Fragment>
                <div className={Styles.bg} onClick={closeModal} id="closeModal">
                    <div className={Styles.container}>
                        <div className={Styles.priceContainer}>
                            <img
                                className={Styles.gameLogo}
                                src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                                alt="logo"
                            />
                        </div>
                        <div
                            className={Styles.infoContainer}
                            style={{
                                backgroundImage: `url(${img ||
                                    'https://i1.wp.com/static-cdn.jtvnw.net/ttv-boxart/Dota%202.jpg?resize=720%2C960&ssl=1'})`,
                            }}
                        >
                            <div className={Styles.info}>
                                <p className={Styles.itemName}>{name}</p>
                                {activated ? (
                                    <Fragment>
                                        <p className={Styles.itemName}>
                                            Your gift card code is: <br />
                                            {giftCode}
                                        </p>
                                        <button
                                            className={Styles.actionButton}
                                            onClick={closeModal}
                                            id="closeModal"
                                        >
                                            CLOSE
                                        </button>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <p className={Styles.itemName}>{description}</p>
                                        <button
                                            className={Styles.actionButton}
                                            onClick={this._openModal}
                                        >
                                            ACTIVATE
                                        </button>
                                    </Fragment>
                                )}
                            </div>
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
