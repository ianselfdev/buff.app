//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/mainActions';

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
const title = 'start playing and earn coins!';

class History extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            data: this.props.allHistory,
        };
        setInterval(() => {
            this.updateHistory(this.props.allHistory);
        }, 1000);
    }

    updateHistory(history) {
        if (this.state.data !== history) {
            this.setState({ data: history });
        }
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
        const { rowsPerPage, page } = this.state;
        let dataHistory = this.state.data;
        let emptyRows = 0;
        let tableRowsHistory = this.getDataRowsHistory(
            dataHistory,
            page,
            rowsPerPage,
            emptyRows,
        );

        return (
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
                                You will earn more coins by marking achievement
                                in active game
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={Styles.historyMain}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} container>
                            <Grid item xs={8}>
                                <div className={Styles.papersMain}>
                                    <Paper
                                        className={Styles.myAcc}
                                        elevation={8}
                                    >
                                        <div className={Styles.titleHistory}>
                                            History
                                        </div>
                                        <Table className={Styles.tableHistory}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        className={
                                                            Styles.tableColumnHead
                                                        }
                                                    >
                                                        Date & Time
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            Styles.tableColumnHead
                                                        }
                                                    >
                                                        Game\Conversion
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            Styles.tableColumnHead
                                                        }
                                                    >
                                                        KDA
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            Styles.tableColumnHead
                                                        }
                                                    >
                                                        Status
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            Styles.tableColumnHead
                                                        }
                                                    >
                                                        Buff Coins
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            Styles.tableColumnHead
                                                        }
                                                    >
                                                        Conversion
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            {tableRowsHistory}
                                        </Table>
                                        <TablePagination
                                            component="div"
                                            count={
                                                dataHistory
                                                    ? dataHistory.length
                                                    : 0
                                            }
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={this.handleChangePage}
                                            className={
                                                Styles.historyTableFooter
                                            }
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
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    getDataRowsHistory(dataHistory, page, rowsPerPage, emptyRows) {
        if (dataHistory) {
            emptyRows =
                rowsPerPage -
                Math.min(rowsPerPage, dataHistory.length - page * rowsPerPage);
        }

        return (
            <TableBody>
                {dataHistory ? (
                    dataHistory
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )
                        .map((n, k) => {
                            let realTime = this.getDate(n.createdAt);
                            let gameName = this.getGameName(+n.data.gameId);

                            return (
                                <TableRow key={k}>
                                    <TableCell className={Styles.tableColumn}>
                                        {realTime}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {gameName}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {n.data.matchData.kda >= 0
                                            ? n.data.matchData.kda.toFixed(2)
                                            : '-'}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {'finished'}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {Number(n.amount)
                                            ? Number(n.amount).toFixed(2)
                                            : '-'}
                                    </TableCell>
                                    <TableCell className={Styles.tableColumn}>
                                        {Number(n.amount)
                                            ? (Number(n.amount) / 2).toFixed(
                                                  2,
                                              ) + '$'
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
const mapStateToProps = (state) => ({
    allHistory: state.reducerMain.allHistory,
    username: state.reducerMain.username,
    online: state.reducerMain.onlineUsers,
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(History);
