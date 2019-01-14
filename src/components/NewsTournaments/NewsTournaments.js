//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { Grid, Paper, Button } from '@material-ui/core';
const title = 'start playing and earn coins!';

class NewsTournaments extends Component {
    render() {
        let news = this.props.allNews;
        let tournaments = this.props.allTournaments;
        return (
            <div className={Styles.newsTournamentsComponent}>
                <Grid container spacing={24}>
                    <Grid item xs={12} container>
                        <Grid item xs={10}>
                            <div
                                className={Styles.newsTournamentsTitle}
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
                <div className={Styles.newsTournamentsMain}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} container>
                            <Grid item xs={4}>
                                <div className={Styles.papersMain}>
                                    <Paper
                                        className={`${Styles.myAcc} ${Styles.newsBox}`}
                                        elevation={8}
                                    >
                                        <div className={Styles.titleMyAcc}>Latest News</div>
                                        {news ? (
                                            news.map((n, k) => {
                                                return (
                                                    <div key={k}>
                                                        <div className={Styles.newsMain}>
                                                            <div
                                                                className={Styles.newsDotesContents}
                                                            >
                                                                <div className={Styles.newsDotes} />
                                                            </div>
                                                            <div className={Styles.newsContent}>
                                                                {n.title}
                                                                <div
                                                                    className={Styles.sectionButton}
                                                                >
                                                                    <div
                                                                        className={Styles.newsTitle}
                                                                    >
                                                                        {n.createdAt.substring(
                                                                            0,
                                                                            10,
                                                                        )}
                                                                    </div>
                                                                    <Button
                                                                        size="small"
                                                                        className={
                                                                            Styles.buttonReadMore
                                                                        }
                                                                        href={n.link}
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
                                    <Paper className={Styles.myAcc} elevation={8}>
                                        <div className={Styles.titleMyAcc}>Tournaments</div>
                                        {tournaments ? (
                                            tournaments.map((n, k) => (
                                                <div key={k}>
                                                    <div className={Styles.newsMain}>
                                                        <div className={Styles.newsDotesContents}>
                                                            <div className={Styles.newsDotes} />
                                                        </div>
                                                        <div className={Styles.newsContent}>
                                                            {n.title}
                                                            <div className={Styles.sectionButton}>
                                                                <div className={Styles.newsTitle}>
                                                                    {n.createdAt.substring(0, 10)}
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    className={
                                                                        Styles.buttonReadMore
                                                                    }
                                                                    href={n.link}
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
                                            ))
                                        ) : (
                                            <div>In the near future there are no tournaments</div>
                                        )}
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
}
const mapStateToProps = (state) => ({
    //...
});

function mapDispatchToProps(dispatch) {
    //...
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsTournaments);
