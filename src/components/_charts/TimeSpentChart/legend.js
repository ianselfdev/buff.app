//Core
import React from 'react';

//Styles
import Styles from './legend.module.scss';

export const legend = (props) => {
    const { payload } = props;

    return (
        <div className={Styles.container}>
            {payload.map((entry, index) => (
                <div
                    key={`item-${index}`}
                    style={{
                        margin: '.5rem 0',
                    }}
                    className={Styles.itemBox}
                >
                    <div className={Styles.circle} style={{ backgroundColor: entry.color }} />
                    <p className={Styles.gameName}>{entry.value}</p>
                    <p className={Styles.hours}>
                        {entry.payload.value}
                        <span>hours</span>
                    </p>
                </div>
            ))}
        </div>
    );
};
