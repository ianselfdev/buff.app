//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
// import csgo_logo from '../../theme/svg/csgo_logo.svg';
import logo from '../../theme/svg/logo-short.svg';

//Components
import Activation from '../_popups/market/Activation';

//Analytics
import { Analytics } from '../../analytics';

//Actions
import { marketActions } from '../../bus/market/actions';

const mapStateToProps = (state) => {
    return {
        successPurchaseLabel: state.ui.get('successPurchaseLabel'),
    };
};

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
};

class UserItem extends Component {
    state = {
        showModal: false,
    };

    _openModal = (e) => {
        const { id } = this.props;
        Analytics.event('User item details opened', { category: id });
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
        const { name, img, shortDescription, marginTop, isGoal } = this.props;

        return (
            <>
                <div
                    className={`${Styles.container} ${isGoal ? Styles.isFavoriteContainer : null}`}
                    style={{ marginTop: marginTop || 0 }}
                >
                    <img className={Styles.itemImg} src={img} alt="" onClick={this._openModal} />
                    <p className={Styles.title} onClick={this._openModal}>
                        {name}
                    </p>
                    <div className={Styles.itemInfo}>
                        <img src={logo} alt="" />
                        <p>{shortDescription}</p>
                    </div>
                    <div className={Styles.actionsContainer}>
                        <div className={Styles.button} onClick={this._openModal}>
                            Activate
                        </div>
                    </div>
                    {showModal && <Activation closeModal={this._closeModal} {...this.props} />}
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserItem);
