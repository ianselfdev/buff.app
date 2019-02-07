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
        const { name, tradable = false, activatable = true, img } = this.props;

        return (
            <Fragment>
                <div className={Styles.container}>
                    <div className={Styles.priceContainer}>
                        <img
                            className={Styles.gameLogo}
                            src="https://1000logos.net/wp-content/uploads/2017/12/CSGO-Logo.png"
                            alt="logo"
                        />
                        {/* <p>{price}</p> */}
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
                            <button onClick={this._openModal}>ACTIVATE</button>
                        </div>
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
