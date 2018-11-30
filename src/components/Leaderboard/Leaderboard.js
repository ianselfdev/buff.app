import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { AppBar, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
} from '@material-ui/core/Table';
import './Leaderboard.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/mainActions';
import ReactTooltip from 'react-tooltip';
import SwipeableViews from 'react-swipeable-views';

const title = 'start playing and earn coins!';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir}>
            {children}
        </Typography>
    );
}

class Leaderboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: 0,
            page: 0,
            pageLoL: 0,
            rowsPerPage: 3,
            data: this.props.allLeaaderBoard,
        };
        setInterval(() => {
            this.updateLeaders(this.props.allLeaaderBoard, 'DOTA');
            this.updateLeaders(this.props.allLeaaderBoardLol, 'LOL');
        }, 1000);
    }

    updateLeaders(leader, game) {
        if (game === 'DOTA') {
            if (this.state.data !== leader) {
                this.setState({ data: leader });
            }
        } else {
            if (this.state.data !== leader) {
                this.setState({ dataLoL: leader });
            }
        }
    }

    handleChangePage = (event, page) => {
        console.log('PAGE::', page);
        this.setState({ page });
    };

    handleChangePageLoL = (event, pageLoL) => {
        console.log('PAGELOL::', pageLoL);
        this.setState({ pageLoL });
    };
    handleOpenKey = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };
    render() {
        let onlineUser = this.props.online;
        const { rowsPerPage, page, pageLoL } = this.state;
        let dataLiderboard = this.state.data;
        let dataLiderboardLoL = this.state.dataLoL;
        let emptyRows = 0;
        let emptyRowsLoL = 0;
        if (dataLiderboardLoL) {
            emptyRowsLoL =
                rowsPerPage -
                Math.min(
                    rowsPerPage,
                    dataLiderboardLoL.length - pageLoL * rowsPerPage,
                );
        }
        if (dataLiderboard) {
            emptyRows =
                rowsPerPage -
                Math.min(
                    rowsPerPage,
                    dataLiderboard.length - page * rowsPerPage,
                );
        }
        const { theme } = this.props;

        return (
            <div>
                <h1>Start playing to earn more coins!</h1>
                <h4>
                    You will earn more coins by marking achievement in active
                    game
                </h4>
                <div className="leaderboard-container">
                    <div className="leaderboard-table">
                        <div>Leaderboard</div>
                        <div>
                            <span>Name</span>
                            <span>Period</span>
                            <span>PubKey</span>
                            <span>Win / Lose</span>
                            <span>Buff Earned</span>
                        </div>
                        <div>
                            <span>Dota 2</span>
                            <span>past week</span>
                            <span>43789gf8347gr84gr8g89g73gro8gog348r</span>
                            <span>8/5</span>
                            <span>89.7</span>
                        </div>
                        <div>
                            <span>Dota 2</span>
                            <span>past week</span>
                            <span>h3f4ubfowiu54ou54g4875g854i5go487g5</span>
                            <span>0/5</span>
                            <span>20.7</span>
                        </div>
                        <div>
                            <span>Dota 2</span>
                            <span>past week</span>
                            <span>0alkna731v31hv3jhv2l342l34jhvlhlj3h</span>
                            <span>2/0</span>
                            <span>18.8</span>
                        </div>
                    </div>
                    <div className="papersMain">
                        <Paper className="myAcc" elevation={8}>
                            <div className="titleMyAcc">Chat Box</div>
                            <div className="balanceMyAcc">
                                <div style={{ color: '#919191' }}>
                                    <iframe
                                        src="https://discordapp.com/widget?id=442965268386283521&theme=dark"
                                        width="300"
                                        height="350"
                                        allowtransparency="true"
                                        frameBorder="0"
                                    />
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allLeaaderBoard: state.reducerMain.leaderBoardDota,
    allLeaaderBoardLol: state.reducerMain.leaderBoardLol,
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
)(Leaderboard);
