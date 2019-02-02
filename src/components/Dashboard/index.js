//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Components
import UserProgress from '../UserProgress';
import Quests from '../Quests';
import MarketRecomendations from '../MarketRecomendations';
import RecentActivity from '../RecentActivity';
import DashboardFavorite from '../DashboardFavorite';

export default class Dashboard extends Component {
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
                    <div className={Styles.contentBox} />
                </div>
            </div>
        );
    }
}
