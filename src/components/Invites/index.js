//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';
import { notifications } from '../_notifications';

//Actions
import { profileActions } from '../../bus/profile/actions';

const mapStateToProps = (state) => ({
    referralCode: state.profile.get('referralCode'),
});

const mapDispatchToProps = {
    getReferralCodeAsync: profileActions.getReferralCodeAsync,
};

class Invites extends Component {
    componentDidMount = () => {
        const { getReferralCodeAsync } = this.props;

        getReferralCodeAsync();
    };

    _showCode = () => {
        const { referralCode } = this.props;

        notifications.info(
            `You will be able to invite friends with code ${referralCode}...Later :P`,
        );
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
                <button className={Styles.button} onClick={this._showCode}>
                    Invite
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Invites);
