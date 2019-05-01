//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/svg/coin.svg';
import star from '../../theme/svg/star.svg';
import { notifications } from '../_notifications';

//REST
import { Api } from '../../REST/api';

export default class GoalItem extends Component {
    _handleSetGoalItem = async () => {
        const { id, closeTutorial } = this.props;

        await Api.market.setGoalItem(id);

        notifications.success('Goal set successfully!');
        closeTutorial();
    };

    render() {
        const { price, name, img, marginTop, isGoal, discount } = this.props;

        return (
            <>
                <div
                    className={`${Styles.container} ${isGoal ? Styles.isFavoriteContainer : null}`}
                    style={{ marginTop: marginTop || 0 }}
                >
                    <div
                        className={`${Styles.favoriteButton} ${
                            isGoal ? Styles.isFavoriteButton : null
                        }`}
                        onClick={this._handleSetGoalItem}
                    >
                        <img src={star} alt="" />
                    </div>
                    <img className={Styles.itemImg} src={img} alt="" onClick={this._openModal} />
                    <p className={Styles.title} onClick={this._openModal}>
                        {name}
                    </p>
                    <div className={Styles.actionsContainer}>
                        <div className={Styles.price}>
                            <img src={coin} alt="" />
                            {((price * (100 - +discount)) / 100).toFixed(2)}
                        </div>
                        <div className={Styles.button} onClick={this._handleSetGoalItem}>
                            Set goal
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
