//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { UserStatusChart } from '../_charts/UserStatusChart';
import medal from '../../theme/svg/medal.svg';

const mapStateToProps = (state) => {
    const { points, level, start, end } = state.profile.get('tier');
    return {
        points,
        level,
        start,
        end,
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

    render() {
        const { points, level, end, start, balance, bonusBalance } = this.props;

        //kmelct is a lazy dick if you ever wanted to know
        const pointsToEarn = +end === Infinity ? 0 - points : end - points;
        const data = [{ x: 'Current progress', y: points }, { x: 'Goal', y: pointsToEarn }];

        //Tiers counting
        const currentTierPoints = Math.min(points, +end === Infinity ? start : end);

        return (
            <>
                <div className={Styles.container}>
                    <div className={Styles.chart}>
                        <UserStatusChart data={data} />
                        <img src={medal} alt="" className={Styles.medal} />
                    </div>
                    <div className={Styles.chartText}>
                        <p className={Styles.playerTier}>{level}</p>
                        <p className={Styles.tierBonus}>
                            Tier bonus: <span>5%</span>
                        </p>
                    </div>
                    <div className={Styles.userBalance}>
                        Your Balance <p>{+balance + +bonusBalance}</p>
                    </div>
                    <div className={Styles.nextTier}>
                        Next tier
                        <p>
                            {currentTierPoints}
                            <span>/{(+end === Infinity ? +start : +end).toFixed(0)}</span>
                        </p>
                    </div>
                    <div className={Styles.moreCoins}>
                        <p>Feeling hungry for reward?</p>
                        <p>Buy premium to get more bonuses</p>
                    </div>
                    <button className={Styles.button}>Learn more</button>
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    null,
)(UserProgress);
