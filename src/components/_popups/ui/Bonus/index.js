//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Actions
import { uiActions } from '../../../../bus/ui/actions';

const mapDispatchToProps = {
    hideBonusPopup: uiActions.hideBonusPopup,
};

//!__temporary data__
const avatar = 'https://small-games.info/avko/7/175121_78533.gif';

class Bonus extends Component {
    render() {
        const { hideBonusPopup } = this.props;

        return (
            <div className={Styles.container} onClick={hideBonusPopup}>
                <img src={avatar} alt="bonus img" className={Styles.img} />
                <div className={Styles.messages}>
                    <p className={Styles.message}>Short bonus message!</p>
                    <p className={Styles.amount}>Buff coins: {10}</p>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(Bonus);
