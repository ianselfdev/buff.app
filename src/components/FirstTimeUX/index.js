//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import close from '../../theme/svg/close.svg';
import coin from '../../theme/svg/coin.svg';
import discount5 from '../../theme/svg/discount5.svg';
import line1 from '../../theme/svg/ftue/line1.svg';
import line2 from '../../theme/svg/ftue/line2.svg';
import line3 from '../../theme/svg/ftue/line3.svg';
import line4 from '../../theme/svg/ftue/line4.svg';
import play from '../../theme/svg/ftue/play.svg';
import earn from '../../theme/svg/ftue/earn.svg';
import spend from '../../theme/svg/ftue/spend.svg';
import { Analytics } from '../../analytics';

export default class FistTimeUX extends Component {
    state = {
        page: 1,
    };

    _next = () => {
        this.setState((prevState) => {
            return prevState.page === 1 ? { page: 2 } : { page: 1 };
        });

        Analytics.tutorialViewed();
    };

    render() {
        const { closeTutorial } = this.props;
        const { page } = this.state;

        return (
            <div className={Styles.bg}>
                <img
                    src={close}
                    alt=""
                    className={Styles.closeButton}
                    onClick={closeTutorial}
                    onMouseDown={Analytics.tutorialClosed}
                />
                <div className={Styles.item}>
                    {page === 1 ? (
                        <>
                            <p className={Styles.title}>
                                Welcome to <span>BUFF</span>
                            </p>
                            <p className={Styles.text}>
                                Your life as a gamer will never be the same
                            </p>
                            <div className={Styles.imageBox}>
                                <img src={line1} alt="" />
                                <img src={play} alt="" className={Styles.actionImage} />
                                <img src={line2} alt="" />
                                <img src={earn} alt="" className={Styles.actionImage} />
                                <img src={line3} alt="" />
                                <img src={spend} alt="" className={Styles.actionImage} />
                                <img src={line4} alt="" />
                            </div>
                            <p className={Styles.text}>
                                The more and better you play - the more BUFF coins you will earn
                            </p>
                        </>
                    ) : (
                        <>
                            <div className={Styles.bonusesContainer}>
                                <div className={Styles.bonusItem}>
                                    <img src={coin} alt="" />
                                    <p>10 BUFF coins</p>
                                </div>
                                <div className={Styles.bonusItem}>
                                    <img src={discount5} alt="" />
                                    <p>5% Discount</p>
                                </div>
                            </div>
                            <p className={Styles.title}>And here's your first reward</p>
                            <p className={Styles.text}>
                                Psssst! And we also give you 5% discount for a goal item you'll
                                choose
                            </p>
                        </>
                    )}

                    <button onClick={page === 1 ? this._next : closeTutorial}>
                        {page === 1 ? 'Next' : 'Start playing'}
                    </button>
                    <div
                        className={Styles.statusBar}
                        style={{
                            width: page === 1 ? '50%' : '100%',
                        }}
                    >{`Step ${page}/2`}</div>
                </div>
            </div>
        );
    }
}
