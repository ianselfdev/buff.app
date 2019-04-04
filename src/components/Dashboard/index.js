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
import { profileActions } from '../../bus/profile/actions';

const mapStateToProps = (state) => ({
    advertisements: state.advertisements,
    goalItem: state.profile.get('goalItem'),
});

const mapDispatchToProps = {
    createAdInstanceAsync: advertisementActions.createAdInstanceAsync,
    getGoalItemAsync: profileActions.getGoalItemAsync,
};

class Dashboard extends Component {
    state = {
        ad: {},
    };

    componentDidMount = () => {
        const { createAdInstanceAsync, advertisements, getGoalItemAsync } = this.props;

        getGoalItemAsync();

        /*eslint-disable no-undef*/
        //checking if ad instance already exists
        if (advertisements.refreshAd) {
            advertisements.refreshAd();
        } else {
            createAdInstanceAsync(document.getElementById('ad-div'));
        }

        if (process.env.NODE_ENV === 'production') {
            overwolf.windows.onStateChanged.addListener(this._handleShowAd);
        }
    };

    componentWillUnmount = () => {
        const { advertisements } = this.props;

        //checking if ad instance already exists
        if (advertisements.refreshAd) {
            advertisements.removeAd();
        }

        if (process.env.NODE_ENV === 'production') {
            overwolf.windows.onStateChanged.removeListener(this._handleShowAd);
        }
        /*eslint-enable no-undef*/
    };

    _handleShowAd = (state) => {
        const { advertisements } = this.props;
        if (state) {
            // when state changes to minimized, call removeAd()
            if (state.window_state === 'minimized') {
                advertisements.removeAd();
            }
            // when state changes from minimized to normal, call refreshAd()
            else if (
                state.window_previous_state === 'minimized' &&
                state.window_state === 'normal'
            ) {
                advertisements.refreshAd();
            }
        }
    };

    render() {
        const { goalItem } = this.props;

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
                    {goalItem ? (
                        <MarketItem
                            {...goalItem}
                            isGoal={true}
                            shortDescription={goalItem.descriptionShort}
                        />
                    ) : (
                        <MarketItem
                            shortDescription="This is a mock description untill you choose you goal item"
                            price="0.00"
                            discount="0"
                            name="Click me & Read me"
                            description="Go to the marketplace, find the item that suits best for you and click a star at the top left corner - it will add this item to the Goal items and you will see it here. In the future, this will give you an ability to get special discounts for chosen items!"
                            img="https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/Bwb4bH4iOliyzsy5m7/graphicstock-freehand-drawn-cartoon-click-me-symbol_Hq0d3THNW_thumb.jpg"
                            isGoal={true}
                        />
                    )}
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
