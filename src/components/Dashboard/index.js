//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import UserProgress from '../UserProgress';
import Quests from '../Quests';
import MarketRecomendations from '../MarketRecomendations';
import RecentActivity from '../RecentActivity';
import DashboardFavorite from '../DashboardFavorite';

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
                </div>
                <div className={Styles.invites}>
                    <span className={Styles.title}>Invites</span>
                </div>
                <div className={Styles.dailyBonus}>
                    <span className={Styles.title}>Daily bonus</span>
                </div>
                <div className={Styles.userFavorite}>
                    <span className={Styles.title}>Your favorite</span>
                </div>
                <div className={Styles.userGoal}>
                    <span className={Styles.title}>Goal</span>
                </div>
                <div className={Styles.userRecommended}>
                    <span className={Styles.title}>Recomended for you</span>
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
