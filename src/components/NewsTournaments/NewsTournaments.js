import React, { Component } from 'react';
import './NewsTournaments.scss';
import { Grid, Paper, Button } from '@material-ui/core';
import * as mainActions from '../../actions/mainActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const title = 'start playing and earn coins!';
class NewsTournaments extends Component {
    render() {
        let onlineUser = this.props.online;
        let news = this.props.allNews;
        let tournaments = this.props.allTournaments;
        return (
            <div className="NewsTournamentsComponent">
                <Grid container spacing={24}>
                    <Grid item xs={12} container>
                        <Grid item xs={10}>
                            <div
                                className="NewsTournamentsTitle"
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
                <div className="NewsTournamentsMain">
                    <Grid container spacing={24}>
                        <Grid item xs={12} container>
                            <Grid item xs={4}>
                                <div className="papersMain">
                                    <Paper
                                        className="myAcc newsBox"
                                        elevation={8}
                                    >
                                        <div className="titleMyAcc">
                                            Latest News
                                        </div>
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
                                                                    <div className="newsTitle">
                                                                        {n.createdAt.substring(
                                                                            0,
                                                                            10,
                                                                        )}
                                                                    </div>
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
                                            Tournaments
                                        </div>
                                        {tournaments ? (
                                            tournaments.map((n, k) => (
                                                <div key={k}>
                                                    <div className="newsMain">
                                                        <div className="newsDotesContents">
                                                            <div className="newsDotes" />
                                                        </div>
                                                        <div className="newsContent">
                                                            {n.title}
                                                            <div className="sectionButton">
                                                                <div className="newsTitle">
                                                                    {n.createdAt.substring(
                                                                        0,
                                                                        10,
                                                                    )}
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    className="buttonReadMore"
                                                                    href={
                                                                        n.link
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    Read More
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
                                            ))
                                        ) : (
                                            <div>
                                                In the near future there are no
                                                tournaments
                                            </div>
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
    allTournaments: state.reducerMain.allTournaments,
    allNews: state.reducerMain.allNews,
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
)(NewsTournaments);
