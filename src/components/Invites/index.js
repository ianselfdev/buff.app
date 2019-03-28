//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';

//Actions
import { profileActions } from '../../bus/profile/actions';

const mapDispatchToProps = {
    getReferralCodeAsync: profileActions.getReferralCodeAsync,
};

class Invites extends Component {
    componentDidMount = () => {
        const { getReferralCodeAsync } = this.props;

        getReferralCodeAsync();
    };

    render() {
        return (
            <div className={Styles.container}>
                <div className={Styles.earningsContainer}>
                    <p>Earn for each friend:</p>
                    <p className={Styles.coins}>
                        <img src={coin} alt="" />
                        150 BUFF coins
                    </p>
                </div>
                <button className={Styles.button}>Invite</button>
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(Invites);
