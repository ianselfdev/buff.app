//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { UserWeeklyChart } from '../_charts/UserWeeklyChart';

export default class UserWeeklyStats extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <UserWeeklyChart />
            </div>
        );
    }
}
