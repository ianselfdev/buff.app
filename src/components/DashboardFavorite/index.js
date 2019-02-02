//Core
import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import image from '../../theme/assets/comingSoon.png';

export default class DashboardFavorite extends Component {
    render() {
        return (
            <Fragment>
                <div className={Styles.titleBox}>Your favorite</div>
                <img className={Styles.image} src={image} alt="comingsoon" />
                <div className={Styles.dots}>
                    <span />
                    <span />
                    <span />
                </div>
                <div className={Styles.button}>Play Now</div>
            </Fragment>
        );
    }
}
