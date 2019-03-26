//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import UserProgress from '../UserProgress';
import UserWeeklyStats from '../UserWeeklyStats';
import Invites from '../Invites';
import DailyBonus from '../DailyBonus';
import MarketItem from '../MarketItem';
import MarketRecomendations from '../MarketRecomendations';

//Actions
import { advertisementActions } from '../../bus/app/advertisements/actions';

const mapStateToProps = (state) => ({
    advertisements: state.advertisements,
});

const mapDispatchToProps = {
    createAdInstanceAsync: advertisementActions.createAdInstanceAsync,
};

class Dashboard extends Component {
    state = {
        ad: {},
    };

    componentDidMount = () => {
        const { createAdInstanceAsync, advertisements } = this.props;

        //fallback
        if (advertisements.refreshAd) {
            advertisements.refreshAd();
        } else {
            createAdInstanceAsync(document.getElementById('ad-div'));
        }
    };

    componentWillUnmount = () => {
        const { advertisements } = this.props;

        //fallback
        if (advertisements.refreshAd) {
            advertisements.removeAd();
        }
    };

    render() {
        return (
            <div className={Styles.mainContainer}>
                <div className={Styles.userProgress}>
                    <span className={Styles.title}>Your progress</span>
                    <UserProgress />
                </div>
                <div className={Styles.weeklyStats}>
                    <span className={Styles.title}>Your weekly stats</span>
                    <UserWeeklyStats />
                </div>
                <div className={Styles.invites}>
                    <span className={Styles.title}>Invites</span>
                    <Invites />
                </div>
                <div className={Styles.dailyBonus}>
                    <span className={Styles.title}>Daily bonus</span>
                    <DailyBonus />
                </div>
                <div className={Styles.userGoal}>
                    <span className={Styles.title}>Goal</span>
                    <MarketItem
                        price={500}
                        name="AWP|MortisAWP|Mortis"
                        img="https://www.pcgamesn.com/wp-content/uploads/2018/07/dota-2-loot-boxes-netherlands-580x332.jpg"
                    />
                </div>
                <div className={Styles.userRecommended}>
                    <span className={Styles.title}>Recomended for you</span>
                    <MarketRecomendations />
                </div>
                <div className={Styles.ad} id="ad-div" />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
