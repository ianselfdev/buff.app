//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instuments
import coin from '../../theme/svg/coin.svg';

//Actions
import { bonusesActions } from '../../bus/app/bonuses/actions';

const mapStateToProps = (state) => ({
    bonuses: state.bonuses,
});

const mapDispatchToProps = {
    fetchAvailableBonusesAsync: bonusesActions.fetchAvailableBonusesAsync,
};

class DailyBonus extends Component {
    componentDidMount = () => {
        const { fetchAvailableBonusesAsync } = this.props;

        fetchAvailableBonusesAsync();
    };

    render() {
        return (
            <div className={Styles.container}>
                <p className={Styles.text}>You may get your next bonus after:</p>
                <div className={Styles.timer}>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>12</p>
                    </div>
                    <span>:</span>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>12</p>
                    </div>
                    <span>:</span>
                    <div className={Styles.timerItem}>
                        <p className={Styles.timerNumber}>12</p>
                    </div>
                </div>
                <button className={Styles.button}>
                    <img src={coin} alt="" />
                    10
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DailyBonus);
