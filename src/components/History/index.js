//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Grid,
} from '@material-ui/core';
import ErrorCatcher from '../ErrorCatcher';

//Actions
import { historyActions } from '../../bus/app/history/actions';

const title = 'start playing and earn coins!';

const mapStateToProps = (state) => ({
    history: state.history,
});

const mapDispatchToProps = {
    fetchHistoryAsync: historyActions.fetchHistoryAsync,
};

class History extends Component {
    state = {
        page: 0,
        rowsPerPage: 5,
    };

    componentDidMount() {
        const { fetchHistoryAsync } = this.props;
        fetchHistoryAsync();
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    getGameName(name) {
        if (name === 7314) name = 'Dota 2';
        else if (name === 5426) name = 'League of Legends';
        else if (name === 21216) name = 'Fortnite';
        else name = 'undefined';
        return name;
    }
    getDate(d) {
        let realDate = new Date(d);
        let h = this.addZero(realDate.getHours());
        let m = this.addZero(realDate.getMinutes());
        let date =
            realDate.getFullYear() +
            '-' +
            (realDate.getMonth() + 1) +
            '-' +
            realDate.getDate() +
            ' ' +
            h +
            ':' +
            m;
        return date;
    }
    addZero = (i) => {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    };

    render() {
        const { history } = this.props;
        const { rowsPerPage, page } = this.state;

        let dataHistory = history;
        let emptyRows = 0;
        let tableRowsHistory = this.getDataRowsHistory(dataHistory, page, rowsPerPage, emptyRows);

        return (
            <ErrorCatcher>
                <div className={Styles.historyComponent}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} container>
                            <Grid item xs={10}>
                                <div
                                    className={Styles.historyTitle}
                                    style={{ width: 300, height: 80 }}
                                >
                                    {title.toLocaleUpperCase()}
                                </div>
                                <div
                                    className={Styles.contentTitle}
                                    style={{ width: 550, height: 60 }}
                                >
                                    You will earn more coins by marking achievement in active game
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className={Styles.historyMain}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} container>
                                <Grid item xs={8}>
                                    <div className={Styles.papersMain}>
                                        <Paper className={Styles.myAcc} elevation={8}>
                                            <div className={Styles.titleHistory}>History</div>
                                            <Table className={Styles.tableHistory}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            className={Styles.tableColumnHead}
                                                        >
                                                            Date & Time
                                                        </TableCell>
                                                        <TableCell
                                                            className={Styles.tableColumnHead}
                                                        >
                                                            Game\Conversion
                                                        </TableCell>
                                                        <TableCell
                                                            className={Styles.tableColumnHead}
                                                        >
                                                            KDA
                                                        </TableCell>
                                                        <TableCell
                                                            className={Styles.tableColumnHead}
                                                        >
                                                            Status
                                                        </TableCell>
                                                        <TableCell
                                                            className={Styles.tableColumnHead}
                                                        >
                                                            Buff Coins
                                                        </TableCell>
                                                        <TableCell
                                                            className={Styles.tableColumnHead}
                                                        >
                                                            Conversion
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                {tableRowsHistory}
                                            </Table>
                                            <TablePagination
                                                component="div"
                                                count={dataHistory ? dataHistory.size : 0}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onChangePage={this.handleChangePage}
                                                className={Styles.historyTableFooter}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className={Styles.papersMain}>
                                        <iframe
                                            src="https://discordapp.com/widget?id=442965268386283521&theme=dark"
                                            width="350"
                                            height="400"
                                            allowtransparency="true"
                                            frameBorder="0"
                                            title="unique title"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </ErrorCatcher>
        );
    }

    getDataRowsHistory(dataHistory, page, rowsPerPage, emptyRows) {
        if (dataHistory) {
            emptyRows =
                rowsPerPage - Math.min(rowsPerPage, dataHistory.length - page * rowsPerPage);
        }

        return (
            <TableBody>
                {dataHistory ? (
                    dataHistory
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => {
                            let realTime = this.getDate(item.get('createdAt'));
                            let gameName = this.getGameName(Number(item.get('data').get('gameId')));

                            return (
                                <TableRow key={index}>
                                    <TableCell className={Styles.tableColumn}>{realTime}</TableCell>
                                    <TableCell className={Styles.tableColumn}>{gameName}</TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {item.get('data.matchData.kda') >= 0
                                            ? item
                                                  .get('data.matchData.kda')

                                                  .toFixed(2)
                                            : '-'}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {'finished'}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {Number(item.get('amount'))
                                            ? Number(item.get('amount')).toFixed(2)
                                            : '-'}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {Number(item.get('amount'))
                                            ? (Number(item.get('amount')) / 2).toFixed(2) + '$'
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                ) : (
                    <TableRow />
                )}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(History);
