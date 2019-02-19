//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Images
import Dash from '../../theme/assets/FirstTimeUX/Dash.png';
import History from '../../theme/assets/FirstTimeUX/History.png';
import Leaderboard from '../../theme/assets/FirstTimeUX/Leaderboard.png';
import Marketplace from '../../theme/assets/FirstTimeUX/Marketplace.png';

export default class FistTimeUX extends Component {
    state = {
        image: 1,
    };

    _next = () => {
        this.setState((prevState) => {
            return prevState.image === 4 ? { image: 1 } : { image: ++prevState.image };
        });
    };

    _prev = () => {
        this.setState((prevState) => {
            return prevState.image === 1 ? { image: 4 } : { image: --prevState.image };
        });
    };

    render() {
        const { closeTutorial } = this.props;
        const { image } = this.state;

        return (
            <div className={Styles.bg}>
                <div
                    className={Styles.item}
                    style={{
                        backgroundImage: `url(${
                            image === 1
                                ? Dash
                                : image === 2
                                ? History
                                : image === 3
                                ? Leaderboard
                                : Marketplace
                        })`,
                    }}
                >
                    <div className={Styles.buttonContainer}>
                        <button onClick={this._prev}>⇦</button>
                        <button onClick={this._next}>⇨</button>
                    </div>
                </div>
                <div className={Styles.close} onClick={closeTutorial}>
                    ✘
                </div>
            </div>
        );
    }
}
