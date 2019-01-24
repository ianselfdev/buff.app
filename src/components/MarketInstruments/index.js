//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class MarketInstruments extends Component {
    state = {
        byGame: false,
        byPrice: false,
        byType: false,
        value: 1,
    };

    _toggleByGame = () => {
        this.setState((prevState) => ({
            byGame: !prevState.byGame,
        }));
    };

    _toggleByPrice = () => {
        this.setState((prevState) => ({
            byPrice: !prevState.byPrice,
        }));
    };

    _toggleByType = () => {
        this.setState((prevState) => ({
            byType: !prevState.byType,
        }));
    };

    _handlePriceChange = (e) => {
        const { value } = e.target;

        this.setState({
            value,
        });
    };

    render() {
        const { byGame, byType, byPrice, value } = this.state;
        const max = 100;

        return (
            <div className={Styles.container}>
                <div className={Styles.filtersContainer}>
                    <div className={Styles.title}>Show results for</div>
                    <div className={byGame ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByGame}>By Game</p>
                        <div className={Styles.inputsContainer}>
                            <input type="checkbox" id="dota" />
                            <label for="dota">Dota</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input type="checkbox" id="dota" />
                            <label for="dota">League of Legends</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input type="checkbox" id="dota" />
                            <label for="dota">Fortnite</label>
                        </div>
                    </div>
                    <div className={byPrice ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByPrice}>By Price</p>
                        <div className={Styles.inputsContainer}>
                            <input type="text" value={value} onChange={this._handlePriceChange} />
                            <input
                                type="range"
                                step="1"
                                min="1"
                                max={max}
                                value={value}
                                onChange={this._handlePriceChange}
                            />
                        </div>
                    </div>
                    <div className={byType ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByType}>By Type</p>
                        <div className={Styles.inputsContainer}>
                            <input type="checkbox" id="dota" checked />
                            <label for="dota">Gift Card</label>
                        </div>
                    </div>
                </div>
                <div className={Styles.adContainer} />
            </div>
        );
    }
}
