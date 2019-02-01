//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';
import { VictoryPie, VictoryLabel } from 'victory';

//Actions
import { leaderboardActions } from '../../bus/app/leaderboard/actions';

const data = [{ name: 'Current', value: 750 }, { name: 'Next Level', value: 2500 }];

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

class Dashboard extends Component {
    render() {
        return (
            <div className={Styles.mainContainer}>
                <div className={Styles.contentContainer}>
                    {/* //!move to separate component */}
                    <div className={Styles.contentBox}>
                        <div className={Styles.titleBox}>Your progress</div>
                        <div className={Styles.chart}>
                            {/* //!move to separate CHART component */}
                            <svg viewBox="-100 20 600 600">
                                <VictoryPie
                                    standalone={false}
                                    width={400}
                                    height={400}
                                    data={[{ x: 'User', y: 750 }, { x: 'Goal', y: 2500 }]}
                                    colorScale={['goldenrod', 'lightgrey']}
                                    innerRadius={125}
                                    padAngle={2}
                                    style={{ labels: { fontSize: 20, fill: 'transparent' } }}
                                />
                                <VictoryLabel
                                    textAnchor="middle"
                                    style={{ fontSize: 30, fill: 'goldenrod' }}
                                    x={200}
                                    y={200}
                                    text="Bronze"
                                />
                            </svg>
                        </div>
                        <div className={Styles.legend}>
                            <div className={Styles.legendDatabox}>
                                <p>Next Level</p>
                                <p>
                                    <img src={coin} alt="coins-pic" className={Styles.coinImg} />
                                    2500 in 15 days
                                </p>
                            </div>
                            <div className={Styles.legendDatabox}>
                                <p>Your coins</p>
                                <p>
                                    <img src={coin} alt="coins-pic" className={Styles.coinImg} />
                                    750
                                </p>
                            </div>
                        </div>
                        <div className={Styles.legendButton}>Get Gold Benefits</div>
                    </div>
                    {/* //!move to separate component */}
                    <div className={Styles.contentBox}>
                        <div className={Styles.titleBox}>Earn more BUFF</div>
                    </div>
                </div>
                <div className={Styles.contentContainer}>
                    <div className={Styles.contentBox}>
                        {/* //!move to separate component */}
                        <div className={Styles.titleBox}>Recomended for you</div>
                    </div>
                    <div className={Styles.contentBox}>
                        {/* //!move to separate component */}
                        <div className={Styles.titleBox}>Recent activity</div>
                    </div>
                </div>
                <div className={Styles.contentContainer}>
                    <div className={Styles.contentBox}>
                        {/* //!move to separate component */}
                        <div className={Styles.titleBox}>Your Favorite</div>
                    </div>
                    <div className={Styles.contentBox} />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
