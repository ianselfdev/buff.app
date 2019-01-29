//Core
import React, { Component } from 'react';
import { string, func } from 'prop-types';

//Styles
import Styles from './styles.module.scss';
import { connect } from 'react-redux';

//Actions
import { marketActions } from '../../../../bus/market/actions';

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
    fetchUserItemsAsync: marketActions.fetchUserItemsAsync,
};

class Buy extends Component {
    static propTypes = {
        closeModal: func.isRequired,
        confirm: func.isRequired,
        type: string.isRequired,
    };

    _confirm = () => {
        const { closeModal, confirm } = this.props;

        confirm();
        closeModal();
    };

    render() {
        const { closeModal, type } = this.props;

        return (
            <div className={Styles.bg} onClick={closeModal}>
                <div className={Styles.container}>
                    {type === 'giftCard' ? (
                        <p>
                            When you confirm this action, your gift card will get activated and will
                            be deleted permanently from your inventory. Are you sure you want to
                            proceed?
                        </p>
                    ) : (
                        <p>Confirm action?</p>
                    )}
                    <div className={Styles.buttonContainer}>
                        <div className={Styles.closeButton} onClick={closeModal}>
                            CLOSE
                        </div>
                        <div className={Styles.buyButton} onClick={this._confirm}>
                            YES, I'M READY
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
