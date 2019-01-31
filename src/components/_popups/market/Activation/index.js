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
                <div className={Styles.bg}>
                    <div className={Styles.container}>
                        <p className={Styles.title}>{name}</p>
                        <img
                            src={
                                img ||
                                'https://d1u5p3l4wpay3k.cloudfront.net/allstars_gamepedia/thumb/b/b8/Epic_Loot_Chest.jpg/300px-Epic_Loot_Chest.jpg'
                            }
                            alt="img"
                        />
                        {activated ? (
                            <p className={Styles.code}>
                                Your gift card code is: <br />
                                {giftCode}
                            </p>
                        ) : (
                            <p className={Styles.description}>{description}</p>
                        )}
                        <div className={Styles.buttonContainer}>
                            <button className={Styles.closeButton} onClick={closeModal}>
                                CLOSE
                            </button>
                            {activated ? (
                                <button
                                    className={Styles.buyButton}
                                    onClick={this._openModal}
                                    disabled
                                >
                                    ACTIVATED
                                </button>
                            ) : (
                                <button className={Styles.buyButton} onClick={this._openModal}>
                                    ACTIVATE
                                </button>
                            )}
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
