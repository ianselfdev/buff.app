//Core
import React, { Component } from 'react';

//Instruments
import close from '../../../../theme/svg/close.svg';
import logo from '../../../../theme/svg/logo-short.svg';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//Components
import Confirmation from '../Confirmation';

//Actions
import { marketActions } from '../../../../bus/market/actions';

//Analytics
import { Analytics } from '../../../../analytics';

const mapDispatchToProps = {
    activateItemAsync: marketActions.activateItemAsync,
};

const mapStateToProps = (state) => {
    return {
        giftCode: state.market.get('giftCode'),
    };
};

class Activate extends Component {
    state = {
        showConfirmation: false,
        activated: false,
    };

    _activate = () => {
        const { id, activateItemAsync } = this.props;

        Analytics.event('Item activation', { category: id });
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
        const { closeModal, name, description, img, shortDescription, giftCode } = this.props;
        const { showConfirmation, activated } = this.state;

        return (
            <div className={Styles.bg}>
                <img src={close} alt="" className={Styles.close} onClick={closeModal} />
                <div className={Styles.container}>
                    <img src={img} alt="" className={Styles.itemImage} />
                    <p className={Styles.description}>
                        {activated
                            ? `Your gift card code is:\n
                                            ${giftCode}`
                            : description}
                    </p>
                    <p className={Styles.name}>{name}</p>
                    <div className={Styles.shortDescription}>
                        <img alt="" src={logo} />
                        <p>{shortDescription}</p>
                    </div>
                    <div className={Styles.priceContainer}>
                        {activated ? (
                            <button onClick={closeModal}>Close and remove card</button>
                        ) : (
                            <button onClick={this._openModal}>Activate</button>
                        )}
                    </div>
                </div>
                {showConfirmation && (
                    <Confirmation
                        confirm={this._activate}
                        closeModal={this._closeModal}
                        type="giftCard"
                    />
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Activate);
