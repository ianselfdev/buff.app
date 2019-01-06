import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/mainActions';

const title = 'start playing and earn coins!';
class Dashboard extends Component {
    render() {
        let news = this.props.allNews;
        let onlineUser = this.props.online;
        let userBalance = this.props.userBalance;

        console.log(news);

        return (
            <div className="dashboardComponent">
                <Grid container spacing={24}>
                    <Grid item xs={12} container>
                        <Grid item xs={10}>
                            <div
                                className="dashboardTitle"
                                style={{ width: 300, height: 80 }}
                            >
                                {title.toLocaleUpperCase()}
                            </div>
                            <div
                                className="contentTitle"
                                style={{ width: 550, height: 60 }}
                            >
                                You will earn more coins by marking achievement
                                in active game
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="dashboardMain">
                    <Grid container spacing={24}>
                        <Grid item xs={12} container>
                            <Grid item xs={4}>
                                <div className="papersMain">
                                    <Paper
                                        className="myAcc"
                                        elevation={8}
                                        style={{ width: 370, height: 100 }}
                                    >
                                        <div className="titleMyAcc">
                                            My Account
                                        </div>
                                        <div className="balanceMyAcc">
                                            <div style={{ color: '#919191' }}>
                                                Buff Balance
                                            </div>
                                            <div
                                                style={{
                                                    padding: '0 10px',
                                                    color: '#347139',
                                                }}
                                            >
                                                {userBalance ? userBalance : 0}
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                borderTop: '1px solid #131416',
                                            }}
                                        />

                                        <div className="balanceMyAcc">
                                            <div style={{ color: '#919191' }}>
                                                Status:
                                            </div>
                                            <div
                                                style={{
                                                    padding: '0 10px',
                                                    color: '#347139',
                                                }}
                                            >
                                                Bronze
                                            </div>
                                        </div>
                                    </Paper>
                                </div>

                                <div className="papersMain">
                                    <Paper
                                        className="myAcc"
                                        elevation={8}
                                        style={{ width: 370, height: 250 }}
                                    >
                                        <div className="titleMyAcc">
                                            Active Games
                                        </div>
                                        <div className="balanceMyAcc">
                                            <div style={{ color: '#919191' }}>
                                                Dota 2
                                            </div>
                                        </div>
                                        <div className="balanceMyAcc">
                                            <div style={{ color: '#919191' }}>
                                                Fortnite
                                            </div>
                                        </div>
                                        <div className="balanceMyAcc">
                                            <div style={{ color: '#919191' }}>
                                                League of Legands
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className="papersMain">
                                    <Paper
                                        className="myAcc newsBox"
                                        elevation={8}
                                    >
                                        <div className="titleMyAcc">News</div>
                                        {news ? (
                                            news.map((n, k) => {
                                                return (
                                                    <div key={k}>
                                                        <div className="newsMain">
                                                            <div className="newsDotesContents">
                                                                <div className="newsDotes" />
                                                            </div>
                                                            <div className="newsContent">
                                                                {n.title}
                                                                <div className="sectionButton">
                                                                    {/* <div className="newsTitle">
                                                                        {n.date.substring(
                                                                            0,
                                                                            10,
                                                                        )}
                                                                    </div> */}
                                                                    <Button
                                                                        size="small"
                                                                        className="buttonReadMore"
                                                                        href={
                                                                            n.link
                                                                        }
                                                                        target="_blank"
                                                                    >
                                                                        Read
                                                                        More
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                height: '1.5px',
                                                                borderTop:
                                                                    '1.5px solid #000',
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div />
                                        )}
                                    </Paper>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="papersMain">
                                    <Paper className="myAcc" elevation={8}>
                                        <div className="titleMyAcc">
                                            Chat Box
                                        </div>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allNews: state.reducerMain.allNews,
    online: state.reducerMain.onlineUsers,
    userBalance: state.reducerMain.userBalance,
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
