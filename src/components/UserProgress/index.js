//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';
import { UserStatusChart } from '../_charts/UserStatusChart';
import chartMock from '../../theme/assets/chartMock.PNG';

const mapStateToProps = (state) => {
    const { points, level, start, end } = state.profile.get('tier');
    return {
        points,
        level,
        start,
        end,
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
        const { help } = this.state;
        const { points, level, end } = this.props;

        //kmelct is a lazy dick if you ever wanted to know
        const pointsToEarn = +end === Infinity ? 0 - points : end - points;
        const data = [
            { x: 'Current progress', y: points },
            { x: 'Goal', y: Math.max(pointsToEarn, 0) },
        ];

        return (
            <>
                <div className={Styles.container}>
                    <div className={Styles.chart}>
                        <img src={chartMock} alt="" />
                    </div>
                    <div className={Styles.chartText}>
                        <p className={Styles.playerTier}>{level}</p>
                        <p className={Styles.tierBonus}>
                            Tier bonus: <span>5%</span>
                        </p>
                    </div>
                    <div className={Styles.userBalance}>
                        Your Balance <p>100500</p>
                    </div>
                    <div className={Styles.nextTier}>
                        Next tier
                        <p>
                            5678<span>/6000</span>
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
