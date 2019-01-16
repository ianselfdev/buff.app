//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { Grid, Paper, Button } from '@material-ui/core';

//Actions
import { tournamentsActions } from '../../bus/app/tournaments/actions';

const title = 'start playing and earn coins!';

const mapStateToProps = (state) => ({
    news: state.news,
    tournaments: state.tournaments,
});

const mapDispatchToProps = {
    fetchTournamentsAsync: tournamentsActions.fetchTournamentsAsync,
};

class NewsTournaments extends Component {
    componentDidMount() {
        const { fetchTournamentsAsync } = this.props;
        fetchTournamentsAsync();
    }

    render() {
        const { news, tournaments } = this.props;

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
                                    <Paper className={Styles.myAcc} elevation={8}>
                                        <div className={Styles.titleMyAcc}>Tournaments</div>
                                        {tournaments ? (
                                            tournaments.map((item, index) => (
                                                <div key={index}>
                                                    <div className={Styles.newsMain}>
                                                        <div className={Styles.newsDotesContents}>
                                                            <div className={Styles.newsDotes} />
                                                        </div>
                                                        <div className={Styles.newsContent}>
                                                            {item.get('title')}
                                                            <div className={Styles.sectionButton}>
                                                                <div className={Styles.newsTitle}>
                                                                    {item
                                                                        .get('createdAt')
                                                                        .substring(0, 10)}
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    className={
                                                                        Styles.buttonReadMore
                                                                    }
                                                                    href={item.get('link')}
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
)(NewsTournaments);
