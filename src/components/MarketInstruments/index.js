//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Actions
import { marketActions } from '../../bus/market/actions';

//Redux connect
const mapDispatchToProps = {
    filterMarketItemsAsync: marketActions.filterMarketItemsAsync,
    filterUserItemsAsync: marketActions.filterUserItemsAsync,
    removeMarketFilterParameterAsync: marketActions.removeMarketFilterParameterAsync,
};

class MarketInstruments extends Component {
    state = {
        byGame: false,
        byPrice: false,
        byType: false,
        value: 5000,
        selectedOption: 'none',
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
        const { filterMarketItemsAsync } = this.props;

        filterMarketItemsAsync('maxPrice', value || 5000);

        this.setState({
            value: value || 5000,
        });
    };

    _handleRadioChange = (e) => {
        let { id } = e.target;
        const {
            filterMarketItemsAsync,
            filterUserItemsAsync,
            removeMarketFilterParameterAsync,
        } = this.props;
        if (id === 'none') {
            removeMarketFilterParameterAsync('game');
        } else {
            filterMarketItemsAsync('game', id);
            filterUserItemsAsync('game', id);
        }

        this.setState({
            selectedOption: id,
        });
    };

    render() {
        const { byGame, byType, byPrice, value, selectedOption } = this.state;
        const max = 5000;

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
                                checked={selectedOption === 'dota'}
                                onChange={this._handleRadioChange}
                            />
                            <label htmlFor="dota">Dota</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="lol"
                                checked={selectedOption === 'lol'}
                                onChange={this._handleRadioChange}
                            />
                            <label htmlFor="lol">League of Legends</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="fortnite"
                                checked={selectedOption === 'fortnite'}
                                onChange={this._handleRadioChange}
                            />
                            <label htmlFor="fortnite">Fortnite</label>
                        </div>
                        <div className={Styles.inputsContainer}>
                            <input
                                type="radio"
                                name="byGameFilter"
                                id="none"
                                checked={selectedOption === 'none'}
                                onChange={this._handleRadioChange}
                            />
                            <label htmlFor="none">Show All</label>
                        </div>
                    </div>
                    <div className={byPrice ? `${Styles.filter} ${Styles.active}` : Styles.filter}>
                        <p onClick={this._toggleByPrice}>By Max Price</p>
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
                            <input type="checkbox" id="giftCard" checked readOnly />
                            <label htmlFor="giftCard">Gift Card</label>
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
)(MarketInstruments);
