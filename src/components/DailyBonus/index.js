//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';
import { notifications } from '../_notifications';

//Actions
import { bonusesActions } from '../../bus/app/bonuses/actions';
import { historyActions } from '../../bus/app/history/actions';

const mapStateToProps = (state) => ({
    bonuses: state.bonuses,
    history: state.history,
});
//40b5c672-9c78-4c01-9baf-1d9aa71919b7

const mapDispatchToProps = {
    fetchAvailableBonusesAsync: bonusesActions.fetchAvailableBonusesAsync,
    activateBonusAsync: bonusesActions.activateBonusAsync,
    fetchHistoryAsync: historyActions.fetchHistoryAsync,
};

class DailyBonus extends Component {
    state = {
        intervalId: '',
    };

    componentDidMount = () => {
        const { fetchAvailableBonusesAsync, fetchHistoryAsync } = this.props;

        fetchHistoryAsync();
        fetchAvailableBonusesAsync();

        this.setState({
            intervalId: setInterval(() => {
                this.forceUpdate();
            }, 1000),
        });
    };

    componentWillUnmount = () => {
        const { intervalId } = this.state;

        clearInterval(intervalId);
    };

    _calculateTimeToTheNextDailyBonus = () => {
        const { history } = this.props;

        const lastDailyBonusTransaction = history
            .get('history')
            .find((item) => item.get('data').get('id') === '40b5c672-9c78-4c01-9baf-1d9aa71919b7');

        const nextDailyBonusDate = lastDailyBonusTransaction
            ? new Date(lastDailyBonusTransaction.get('createdAt')).getTime() + 60 * 60 * 24 * 1000
            : null;

        const timeToNextDailyBonus = nextDailyBonusDate - Date.now();

        return Math.max(Math.round(timeToNextDailyBonus / 1000), 0);
    };

    _activateBonusAsync = () => {
        const {
            activateBonusAsync,
            bonuses,
            fetchAvailableBonusesAsync,
            fetchHistoryAsync,
        } = this.props;

        if (localStorage.getItem('demoMode')) {
            return notifications.info(
                'You should quit demo mode and sign up or log in to perform this action.',
            );
        }

        const dailyBonus = bonuses.find(
            (item) => item.get('id') === '40b5c672-9c78-4c01-9baf-1d9aa71919b7',
        );

        if (dailyBonus) {
            activateBonusAsync(dailyBonus.toJS());
        } else {
            return notifications.error(
                'Bonus is not available yet. Earn more coins to get a new one!',
            );
        }

        // workaround at the last second xD
        fetchHistoryAsync();
        fetchAvailableBonusesAsync();
    };

    render() {
        const timeToTheNextBonus = this._calculateTimeToTheNextDailyBonus();

        const hours = Math.floor(timeToTheNextBonus / 3600)
            .toString()
            .padStart(2, 0);
        const minutes = Math.floor((timeToTheNextBonus / 60) % 60)
            .toString()
            .padStart(2, 0);
        const seconds = (timeToTheNextBonus % 60).toString().padStart(2, 0);

        return (
            <div className={Styles.container}>
                <p className={Styles.text}>You may get your next bonus after:</p>
                <div className={Styles.timer}>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>{hours}</p>
                    </div>
                    <span>:</span>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>{minutes}</p>
                    </div>
                    <span>:</span>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>{seconds}</p>
                    </div>
                </div>
                <button
                    className={Styles.button}
                    disabled={timeToTheNextBonus !== 0}
                    onClick={this._activateBonusAsync}
                >
                    <img src={coin} alt="" />
                    10
                    {/* Get bonus */}
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DailyBonus);
