//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';
import { notifications } from '../_notifications';
import { Analytics } from '../../analytics';

//Actions
import { profileActions } from '../../bus/profile/actions';

const mapStateToProps = (state) => ({
    referralCode: state.profile.get('referralCode'),
    email: state.profile.get('email'),
    login: state.profile.get('login'),
    buffId: state.profile.get('buffId'),
});

const mapDispatchToProps = {
    getReferralCodeAsync: profileActions.getReferralCodeAsync,
};

class Invites extends Component {
    state = {
        showCode: false,
    };

    componentDidMount = () => {
        const { getReferralCodeAsync } = this.props;

        getReferralCodeAsync();
    };

    _showCode = () => {
        this.setState({
            showCode: true,
        });
    };

    _copy = () => {
        const { referralCode, email, login, buffId } = this.props;

        navigator.clipboard.writeText(referralCode);
        Analytics.userClicksInviteButton({ email, login, buffId });

        notifications.success('Copied successfully!');
    };

    render() {
        const { showCode } = this.state;
        const { referralCode } = this.props;

        return (
            <div className={Styles.container}>
                {showCode ? (
                    <>
                        <div className={Styles.codeContainer}>
                            <p>Your invitation code:</p>
                            <p className={Styles.code}>{referralCode}</p>
                        </div>
                        <button className={Styles.button} onClick={this._copy}>
                            Copy code
                        </button>
                    </>
                ) : (
                    <>
                        <div className={Styles.earningsContainer}>
                            <p>Earn for each friend:</p>
                            <p className={Styles.coins}>
                                <img src={coin} alt="" />
                                20 BUFF coins
                            </p>
                        </div>
                        <button className={Styles.button} onClick={this._showCode}>
                            Get code
                        </button>
                    </>
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Invites);
