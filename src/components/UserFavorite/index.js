//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import MarketItem from '../MarketItem';
import arrow from '../../theme/svg/navigationArrow.svg';

export default class UserFavorite extends Component {
    state = {
        carouselItem: 0,
        items: ['', '', '', '', ''],
    };

    componentDidMount = async () => {
        //fetch favorite items
    };

    _nextItem = () => {
        const { items } = this.state;

        this.setState((prevState) => ({
            carouselItem: Math.min(++prevState.carouselItem, items.length - 1),
        }));
    };

    _prevItem = () => {
        this.setState((prevState) => ({
            carouselItem: Math.max(--prevState.carouselItem, 0),
        }));
    };

    render() {
        const { carouselItem, items } = this.state;

        console.log(`-${carouselItem * 15}rem`);
        return (
            <div className={Styles.container}>
                <div className={`${Styles.arrow} ${Styles.left}`} onClick={this._prevItem}>
                    <img src={arrow} alt="" />
                </div>
                <div className={Styles.carousel}>
                    <div
                        className={Styles.test}
                        style={{
                            transform: `translateX(-${carouselItem * 15}rem)`,
                            width: `${items.length * 15}rem`,
                        }}
                    >
                        <MarketItem name="1" />
                        <MarketItem name="2" />
                        <MarketItem name="3" />
                        <MarketItem name="4" />
                        <MarketItem name="5" />
                    </div>
                </div>
                <div className={`${Styles.arrow} ${Styles.right}`} onClick={this._nextItem}>
                    <img src={arrow} alt="" />
                </div>
            </div>
        );
    }
}
