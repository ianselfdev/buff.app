//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { UserWeeklyChart } from '../_charts/UserWeeklyChart';
import Select from '../Select';

export default class UserWeeklyStats extends Component {
    render() {
        return (
            <div className={Styles.container}>
                <Select
                    data={[
                        { value: 'itemNumberSHO123TO' },
                        { value: 'itemNumberSHO123222TO' },
                        { value: 'itemNTO' },
                        { value: 'iTO' },
                        { value: 'itemNumTO' },
                        { value: 'it1111erSHOTO' },
                        { value: 'itemNumb321323erSHOTO' },
                    ]}
                    containerStyles={{
                        width: '70%',
                        margin: '0.2rem 2rem',
                    }}
                />
                <UserWeeklyChart />
            </div>
        );
    }
}
