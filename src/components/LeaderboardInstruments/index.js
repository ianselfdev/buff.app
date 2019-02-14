//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Actions
import { leaderboardActions } from '../../bus/app/leaderboard/actions';

//Redux connect

const mapStateToProps = (state) => ({
    advertisements: state.advertisements,
});

const mapDispatchToProps = {
    removeLeadersFilterParameterAsync: leaderboardActions.removeLeadersFilterParameterAsync,
    filterLeadersAsync: leaderboardActions.filterLeadersAsync,
};

class HistoryInstruments extends Component {
    state = {
        byGame: false,
        byPeriod: false,
        selectedGame: 'none',
        selectedPeriod: 'none',
        ad: {},
    };

    componentDidMount = () => {
        const { advertisements } = this.props;

        advertisements.refreshAd();
    };

    componentWillUnmount = () => {
        const { advertisements } = this.props;

        advertisements.removeAd();
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

    _handleGameChange = (e) => {
        const { id } = e.target;
        const { removeLeadersFilterParameterAsync, filterLeadersAsync } = this.props;
        if (id === 'none') {
            removeLeadersFilterParameterAsync('gameId');
        } else {
            filterLeadersAsync('gameId', id);
        }
        this.setState({
            selectedGame: id,
        });
    };

    _handlePeriodChange = (e) => {
        const { id } = e.target;
        console.log(id);
        // const { removeLeadersFilterParameterAsync,
        //     filterLeadersAsync } = this.props;
        // if (id === 'none') {
        //     removeLeadersFilterParameterAsync('period');
        // } else {
        //     filterLeadersAsync('period', id);
        // }

        this.setState({
            period: id,
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
                                id="7314"
                                checked={selectedGame === '7314'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="7314">Dota</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="5426"
                                checked={selectedGame === '5426'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="5426">League of Legends</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="21216"
                                checked={selectedGame === '21216'}
                                onChange={this._handleGameChange}
                            />
                            <label htmlFor="21216">Fortnite</label>
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
                                name="byPeriodFilter"
                                id="86400000"
                                checked={selectedPeriod === '86400000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="86400000">Past Day</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byPeriodFilter"
                                id="604800000"
                                checked={selectedPeriod === '604800000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="604800000">Past Week</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byPeriodFilter"
                                id="2592000000"
                                checked={selectedPeriod === '2592000000'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="2592000000">Past Month</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byPeriodFilter"
                                id="none"
                                checked={selectedPeriod === 'none'}
                                onChange={this._handlePeriodChange}
                            />
                            <label htmlFor="none">Show All</label>
                        </div>
                    </div>
                </div>
                <div className={Styles.adContainer} id="ad-div" />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HistoryInstruments);
