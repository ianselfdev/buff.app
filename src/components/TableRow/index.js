import React, { Component, Fragment } from 'react';

//Styles
import './styles.scss';

export default class TableRow extends Component {
    render() {
        const {
            name,
            period,
            publicKey,
            win,
            lose,
            reward,
            header,
        } = this.props;

        return (
            <div className="table-row">
                {header ? (
                    <Fragment>
                        <div className="table-header">Name</div>
                        <div className="table-header">Period</div>
                        <div className="table-header">Public Key</div>
                        <div className="table-header">Win/Lose</div>
                        <div className="table-header">Buff Earned</div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="table-cell">{name}</div>
                        <div className="table-cell">{period}</div>
                        <div className="table-cell">{publicKey}</div>
                        <div className="table-cell">{`${win}/${lose}`}</div>
                        <div className="table-cell">{reward}</div>
                    </Fragment>
                )}
            </div>
        );
    }
}
