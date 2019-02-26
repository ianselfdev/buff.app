import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import coin from '../../theme/assets/coin.png';

export default class TableRow extends Component {
    render() {
        const { fields, header, type, isConfirmed } = this.props;

        return (
            <div
                className={header ? Styles.headerRow : Styles.tableRow}
                style={{
                    borderBottom: `1px solid ${header ? 'green' : 'black'}`,
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
                                    style={{ color: `${type === 4 || !isConfirmed ? 'red' : ''}` }}
                                >
                                    <img alt="coin" src={coin} />
                                    {item.value}
                                </div>
                            ) : (
                                <div
                                    className={Styles.tableCell}
                                    key={index}
                                    style={{ color: `${type === 4 || !isConfirmed ? 'red' : ''}` }}
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
