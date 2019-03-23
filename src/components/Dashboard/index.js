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
                <div className={Styles.userProgress}>1</div>
                <div className={Styles.weeklyStats}>2</div>
                <div className={Styles.userFavorite}>3</div>
                <div className={Styles.invites}>4</div>
                <div className={Styles.dailyBonus}>5</div>
                <div className={Styles.userGoal}>6</div>
                <div className={Styles.userRecommended}>7</div>
                <div className={Styles.ad} id="ad-div" />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
