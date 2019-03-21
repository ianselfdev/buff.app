//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';
import { UserStatusChart } from '../_charts/UserStatusChart';

const mapStateToProps = (state) => {
    // const { points, level, start, end } = state.profile.get('tier');
    // return {
    //     points,
    //     level,
    //     start,
    //     end,
    // };
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
        const data = [
            { x: 'Current progress', y: points },
            { x: 'Goal', y: Math.max(end - points, 0) },
        ];

        return (
            <>
                <div className={Styles.titleBox}>Your progress</div>
                {/* {help ? (
                    <div className={Styles.infoContainer}>
                        <ul>
                            <li>
                                Level up by earning more coins and spending them on the marketplace
                            </li>
                            <li>Each earned coin gives 1 tier point</li>
                            <li>Each spent coin gives x3 tier points</li>
                            <li>Each tier gives bonuses to the amount of coins you earn</li>
                            <li>Follow your progress on the chart!</li>
                        </ul>
                        <button className={Styles.legendButton} onClick={this._toggleHelp}>
                            Got it!
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={Styles.chart}>
                            <UserStatusChart data={data} status={level} />
                        </div>
                        <div className={Styles.legend}>
                            <div className={Styles.legendDatabox}>
                                <p>Next Tier</p>
                                <p>
                                    {end - points > 0 ? (
                                        <>
                                            <img
                                                src={coin}
                                                alt="coins-pic"
                                                className={Styles.coinImg}
                                            />{' '}
                                            {`${(end - points).toFixed(
                                                2,
                                            )} points for the next tier`}
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
                                    {points.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <button className={Styles.legendButton} onClick={this._toggleHelp}>
                            How do I level up?
                        </button>
                    </>
                )} */}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    null,
)(UserProgress);
