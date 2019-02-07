//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Actions
// import { marketActions } from '../../bus/market/actions';

//Redux connect
const mapDispatchToProps = {};

class HistoryInstruments extends Component {
    state = {
        byGame: false,
        byPeriod: false,
        value: 5000,
        selectedGame: 'none',
        selectedPeriod: 'none',
    };

    _toggleByGame = () => {
        this.setState((prevState) => ({
            byGame: !prevState.byGame,
        }));
    };

    _toggleByPeriod = () => {
        this.setState((prevState) => ({
            byPeriod: !prevState.byPeriod,
        }));
    };

    _toggleByType = () => {
        this.setState((prevState) => ({
            byType: !prevState.byType,
        }));
    };

    _handlePriceChange = (e) => {
        const { value } = e.target;
        const { filterMarketItemsAsync } = this.props;

        filterMarketItemsAsync('maxPrice', value || 5000);

        this.setState({
            value: value || 5000,
        });
    };

    _handleGameChange = (e) => {
        let { id } = e.target;
        // const { removeMarketFilterParameterAsync, filterLeaderboardAsync } = this.props;
        // if (id === 'none') {
        //     removeMarketFilterParameterAsync('game');
        // } else {
        //     filterLeaderboardAsync('game', id);
        // }

        console.log(id);
        this.setState({
            selectedGame: id,
        });
    };

    _handlePeriodChange = (e) => {
        let { id } = e.target;
        // const { removeMarketFilterParameterAsync, filterLeaderboardAsync } = this.props;
        // if (id === 'none') {
        //     removeMarketFilterParameterAsync('game');
        // } else {
        //     filterLeaderboardAsync('game', id);
        // }

        console.log(id);
        this.setState({
            selectedPeriod: id,
        });
    };

    render() {
        const { byGame, byPeriod, selectedGame, selectedPeriod } = this.state;

        return (
            <div className={Styles.container}>
                <div className={Styles.filtersContainer}>
                    <div className={Styles.title}>Filters</div>
                    <div className={byGame ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByGame}>By Game</p>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="dota"
                                checked={selectedGame === 'dota'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="dota">Dota</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="lol"
                                checked={selectedGame === 'lol'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="lol">League of Legends</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="fortnite"
                                checked={selectedGame === 'fortnite'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="fortnite">Fortnite</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="none"
                                checked={selectedGame === 'none'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="none">Show All</label>
                        </div>
                    </div>
                    <div className={byPeriod ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByPeriod}>By Period</p>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="86400000"
                                checked={selectedPeriod === '86400000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="86400000">Past Day</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="604800000"
                                checked={selectedPeriod === '604800000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="604800000">Past Week</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="2592000000"
                                checked={selectedPeriod === '2592000000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="2592000000">Past Month</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="none"
                                checked={selectedPeriod === 'none'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="none">Show All</label>
                        </div>
                    </div>
                </div>
                <div className={Styles.adContainer} />
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(HistoryInstruments);
