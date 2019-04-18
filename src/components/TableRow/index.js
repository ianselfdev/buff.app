import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/svg/coin.svg';

export default class TableRow extends Component {
    render() {
        const { fields, header, type, isConfirmed } = this.props;

        return (
            <div
                className={header ? Styles.headerRow : Styles.tableRow}
                style={{
                    borderBottom: `${header ? 'none' : '.5px solid #1E1F25'}`,
                }}
            >
                {header ? (
                    <Fragment>
                        {fields.map((item, index) => (
                            <div className={Styles.tableHeader} key={index}>
                                {item.name}
                            </div>
                        ))}
                    </Fragment>
                ) : (
                    <Fragment>
                        {fields.map((item, index) =>
                            typeof item.value === 'number' ? (
                                <div
                                    className={Styles.tableCell}
                                    key={index}
                                    style={{
                                        color: `${
                                            type === 4 || !isConfirmed ? '#DB7B35' : '#49AE51'
                                        }`,
                                    }}
                                >
                                    <img alt="coin" src={coin} />
                                    {item.value}
                                </div>
                            ) : (
                                <div
                                    className={Styles.tableCell}
                                    key={index}
                                    style={{
                                        color: `${type === 4 || !isConfirmed ? '#DB7B35' : ''}`,
                                    }}
                                >
                                    {item.value}
                                </div>
                            ),
                        )}
                    </Fragment>
                )}
            </div>
        );
    }
}
