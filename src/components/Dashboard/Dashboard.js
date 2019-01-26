//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { Paper, Grid, Button } from '@material-ui/core';

//Actions
import { newsActions } from '../../bus/app/news/actions';

const title = 'start playing and earn coins!';

const mapStateToProps = (state) => ({
    balance: state.profile.get('balance'),
    news: state.news,
});

const mapDispatchToProps = {
    fetchNewsAsync: newsActions.fetchNewsAsync,
};

class Dashboard extends Component {
    render() {
        const { news, balance } = this.props;

        return (
            <div className={Styles.dashboardComponent}>
                <Grid container spacing={24}>
                    <Grid item xs={12} container>
                        <Grid item xs={10}>
                            <div
                                className={Styles.dashboardTitle}
                                style={{ width: 300, height: 80 }}
                            >
                                {title.toLocaleUpperCase()}
                            </div>
                            <div className={Styles.contentTitle} style={{ width: 550, height: 60 }}>
                                You will earn more coins by marking achievement in active game
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={Styles.dashboardMain}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} container>
                            <Grid item xs={4}>
                                <div className={Styles.papersMain}>
                                    <Paper
                                        className={Styles.myAcc}
                                        elevation={8}
                                        style={{ width: 370, height: 100 }}
                                    >
                                        <div className={Styles.titleMyAcc}>My Account</div>
                                        <div className={Styles.balanceMyAcc}>
                                            <div style={{ color: '#919191' }}>Buff Balance</div>
                                            <div
                                                style={{
                                                    padding: '0 10px',
                                                    color: '#347139',
                                                }}
                                            >
                                                {balance ? balance : 0}
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                borderTop: '1px solid #131416',
                                            }}
                                        />

                                        <div className={Styles.balanceMyAcc}>
                                            <div style={{ color: '#919191' }}>Status:</div>
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

                                <div className={Styles.papersMain}>
                                    <Paper
                                        className={Styles.myAcc}
                                        elevation={8}
                                        style={{ width: 370, height: 250 }}
                                    >
                                        <div className={Styles.titleMyAcc}>Active Games</div>
                                        <div className={Styles.balanceMyAcc}>
                                            <div style={{ color: '#919191' }}>Dota 2</div>
                                        </div>
                                        <div className={Styles.balanceMyAcc}>
                                            <div style={{ color: '#919191' }}>Fortnite</div>
                                        </div>
                                        <div className={Styles.balanceMyAcc}>
                                            <div style={{ color: '#919191' }}>
                                                League of Legands
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={Styles.papersMain}>
                                    <Paper
                                        className={`${Styles.myAcc} ${Styles.newsBox}`}
                                        elevation={8}
                                    >
                                        <div className={Styles.titleMyAcc}>News</div>
                                        {news ? (
                                            news.map((news, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className={Styles.newsMain}>
                                                            <div
                                                                className={Styles.newsDotesContents}
                                                            >
                                                                <div className={Styles.newsDotes} />
                                                            </div>
                                                            <div className={Styles.newsContent}>
                                                                {news.get('title')}
                                                                <div
                                                                    className={Styles.sectionButton}
                                                                >
                                                                    <Button
                                                                        size="small"
                                                                        className={
                                                                            Styles.buttonReadMore
                                                                        }
                                                                        href={news.get('link')}
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
                                                                borderTop: '1.5px solid #000',
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
                                <div className={Styles.papersMain}>
                                    <iframe
                                        src="https://discordapp.com/widget?id=442965268386283521&theme=dark"
                                        style={{
                                            marginLeft: '5%',
                                            width: '300px',
                                            height: '400px',
                                        }}
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
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
