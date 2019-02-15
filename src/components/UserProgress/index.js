//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';
import { UserStatusChart } from '../_charts/UserStatusChart';

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
    render() {
        const { points, level, end } = this.props;
        const data = [
            { x: 'Current progress', y: points },
            { x: 'Goal', y: Math.max(end - points, 0) },
        ];

        return (
            <Fragment>
                <div className={Styles.titleBox}>Your progress</div>
                <div className={Styles.chart}>
                    <UserStatusChart data={data} status={level} />
                </div>
                <div className={Styles.legend}>
                    <div className={Styles.legendDatabox}>
                        <p>Next Tier</p>
                        <p>
                            {end - points > 0 ? (
                                <>
                                    <img src={coin} alt="coins-pic" className={Styles.coinImg} /> `$
                                    {end - points} points for the next tier`
                                </>
                            ) : (
                                `You're already at the top tier!`
                            )}
                        </p>
                    </div>
                    <div className={Styles.legendDatabox}>
                        <p>Your points</p>
                        <p>
                            <img src={coin} alt="coins-pic" className={Styles.coinImg} />
                            {points}
                        </p>
                    </div>
                </div>
                <div className={Styles.legendButton}>Get Gold Benefits</div>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    null,
)(UserProgress);
