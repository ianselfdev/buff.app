//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import Activation from '../_popups/market/Activation';

//Actions
import { marketActions } from '../../bus/market/actions';

//Analytics
import { Analytics } from '../../analytics';

//Redux connect
const mapDispatchToProps = {
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
};

class UserItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = () => {
        const { id } = this.props;
        Analytics.event('User inventory item details opened', { category: id });

        this.setState({
            showModal: true,
        });
    };

    _closeModal = (e) => {
        const { fetchUserItemsAsync } = this.props;

        if (e.target.id === 'closeModal') {
            fetchUserItemsAsync();

            this.setState({
                showModal: false,
            });
        }
    };

    render() {
        const { showModal } = this.state;
        const { name, tradable = false, activatable = true, img } = this.props;

        return (
            <Fragment>
                <div className={Styles.container} onClick={this._openModal}>
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
                            <p className={Styles.itemName}>{'Line 2 Category'}</p>
                            {activatable ? (
                                <button className={Styles.actionButton} onClick={this._openModal}>
                                    ACTIVATE
                                </button>
                            ) : tradable ? (
                                <button className={Styles.actionButton} onClick={this._openModal}>
                                    SELL
                                </button>
                            ) : (
                                <p className={Styles.notTradable}>ITEM IS NOT TRADABLE</p>
                            )}
                        </div>
                    </div>
                </div>
                {showModal && activatable && (
                    <Activation closeModal={this._closeModal} {...this.props} />
                )}
            </Fragment>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(UserItem);
