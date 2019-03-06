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
                <div className={Styles.contentContainer}>
                    <div className={Styles.contentBox}>
                        <UserProgress />
                    </div>
                    <div className={Styles.contentBox}>
                        <Quests />
                    </div>
                </div>
                <div className={Styles.contentContainer}>
                    <div className={Styles.contentBox}>
                        <MarketRecomendations />
                    </div>
                    <div className={Styles.contentBox}>
                        <RecentActivity />
                    </div>
                </div>
                <div className={Styles.contentContainer}>
                    <div className={Styles.contentBox}>
                        <DashboardFavorite />
                    </div>
                    <div className={Styles.contentBox} id="ad-div" />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
