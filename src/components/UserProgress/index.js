//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { UserStatusChart } from '../_charts/UserStatusChart';
import beginner from '../../theme/svg/beginner.svg';
import bronze from '../../theme/svg/bronze.svg';
import silver from '../../theme/svg/silver.svg';
import gold from '../../theme/svg/gold.svg';
import platinum from '../../theme/svg/platinum.svg';
import { notifications } from '../_notifications';

const mapStateToProps = (state) => {
    const { points, level, start, end, color, bonus } = state.profile.get('tier');
    return {
        points,
        level,
        start,
        end,
        color,
        bonus,
        balance: state.profile.get('balance'),
        bonusBalance: state.profile.get('bonusBalance'),
    };
};

class UserProgress extends Component {
    state = {
        help: false,
    };

    _toggleHelp = () => {
        this.setState((prevState) => ({
            help: !prevState.help,
        }));
    };

    _learnMore = () => {
        notifications.info('Premium purchase will become available later. Stay tuned :)');
    };

    render() {
        const { points, level, end, start, balance, bonusBalance, color, bonus } = this.props;

        //kmelct is a lazy dick if you ever wanted to know
        const pointsToEarn = +end === Infinity ? 0 - points : end - points;
        const data = [{ x: 'Current progress', y: points }, { x: 'Goal', y: pointsToEarn }];

        //Tiers counting
        const currentTierPoints = Math.min(points, +end === Infinity ? start : end);

        const medal =
            level === 'Bronze'
                ? bronze
                : level === 'Silver'
                ? silver
                : level === 'Gold'
                ? gold
                : level === 'Platinum'
                ? platinum
                : beginner;

        return (
            <>
                <div className={Styles.container}>
                    <div className={Styles.chart}>
                        <UserStatusChart data={data} color={color} />
                        <img src={medal} alt="" className={Styles.medal} />
                    </div>
                    <div className={Styles.chartText}>
                        <p className={Styles.playerTier}>{level}</p>
                        <p className={Styles.tierBonus}>
                            Tier bonus: <span>{bonus}%</span>
                        </p>
                    </div>
                    <div className={Styles.userBalance}>
                        Your Balance <p>{(+balance + +bonusBalance).toFixed(2)}</p>
                    </div>
                    <div className={Styles.nextTier}>
                        Next tier
                        <p>
                            {+currentTierPoints.toFixed(2)}
                            <span>/{(+end === Infinity ? +start : +end).toFixed(0)}</span>
                        </p>
                    </div>
                    <div className={Styles.moreCoins}>
                        <p>Feeling hungry for reward?</p>
                        <p>Buy premium to get more bonuses</p>
                    </div>
                    <button className={Styles.button} onClick={this._learnMore}>
                        Learn more
                    </button>
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    null,
)(UserProgress);
