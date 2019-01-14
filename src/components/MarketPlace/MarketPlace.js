//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Instruments
import { Grid } from '@material-ui/core';
const title = 'start playing and earn coins!';

class MarketPlace extends Component {
    render() {
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
                    <div className={Styles.comingSoon} />
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
)(MarketPlace);
