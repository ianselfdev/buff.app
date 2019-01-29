//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import Activation from '../_popups/market/Activation';

//Actions
import { marketActions } from '../../bus/market/actions';

//Redux connect
const mapDispatchToProps = {
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
};

class UserItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = () => {
        this.setState({
            showModal: true,
        });
    };

    _closeModal = () => {
        const { fetchUserItemsAsync } = this.props;

        fetchUserItemsAsync();

        this.setState({
            showModal: false,
        });
    };

    render() {
        const { showModal } = this.state;
        const { shortDescription, name, tradable = false, activatable = true, img } = this.props;

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
                    <div className={Styles.priceContainer}>
                        {tradable ? (
                            <button>SELL</button>
                        ) : activatable ? (
                            <button onClick={this._openModal}>Activate</button>
                        ) : (
                            <div className={Styles.notTradable}>Item not tradable</div>
                        )}
                        <img
                            src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                            alt="logo"
                        />
                    </div>
                </div>
                {showModal && <Activation closeModal={this._closeModal} {...this.props} />}
            </Fragment>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(UserItem);
