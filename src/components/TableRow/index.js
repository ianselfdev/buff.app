import React, { Component, Fragment } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class TableRow extends Component {
    render() {
        const { name, period, win, reward, header } = this.props;

        return (
            <div className={Styles.tableRow}>
                {header ? (
                    <Fragment>
                        <div className={Styles.tableHeader}>Name</div>
                        <div className={Styles.tableHeader}>Period</div>
                        <div className={Styles.tableHeader}>Wins</div>
                        <div className={Styles.tableHeader}>Buff Earned</div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className={Styles.tableCell}>{name}</div>
                        <div className={Styles.tableCell}>{period}</div>
                        <div className={Styles.tableCell}>{win ? win : 0}</div>
                        <div className={Styles.tableCell}>{reward}</div>
                    </Fragment>
                )}
            </div>
        );
    }
}
