//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import GoalItem from '../GoalItem';

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

//Actions
import { marketActions } from '../../bus/market/actions';

const mapStateToProps = (state) => {
    return {
        market: state.market,
    };
};

const mapDispatchToProps = {
    fetchMarketItemsAsync: marketActions.fetchMarketItemsAsync,
};

class FistTimeUX extends Component {
    state = {
        page: 1,
    };

    componentDidMount() {
        const { fetchMarketItemsAsync } = this.props;
        fetchMarketItemsAsync();
    }

    _next = () => {
        this.setState((prevState) => {
            return prevState.page === 3 ? { page: 1 } : { page: ++prevState.page };
        });

        Analytics.tutorialViewed();
    };

    render() {
        const { closeTutorial, market } = this.props;
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
                            <div className={Styles.imageBoxSigns}>
                                <p>Play</p>
                                <p>Earn</p>
                                <p>Spend</p>
                            </div>
                            <p className={Styles.text}>
                                The more and better you play - the more BUFF coins you will earn
                            </p>
                        </>
                    ) : page === 2 ? (
                        <>
                            <div className={Styles.bonusesContainer}>
                                <div className={Styles.bonusItem}>
                                    <img src={coin} alt="" />
                                    <p>10 BUFF coins</p>
                                </div>
                                <div className={Styles.bonusItem}>
                                    <img src={discount5} alt="" />
                                    <p>
                                        5% Discount
                                        <br />
                                        on your first purchase
                                    </p>
                                </div>
                            </div>
                            <p className={Styles.title}>And here's your first reward</p>
                            <p className={Styles.text}>
                                Psssst! And we also give you 5% discount for a goal item you'll
                                choose
                            </p>
                        </>
                    ) : (
                        <>
                            <p className={Styles.title}>Choose your goal item</p>
                            <p className={Styles.text}>
                                by clicking on the star icon at the top left corner of a card
                            </p>
                            <div className={Styles.chooseGoalItemContainer}>
                                {market
                                    .get('market')
                                    .slice(0, -1)
                                    .map((item, index) => (
                                        <GoalItem
                                            closeTutorial={closeTutorial}
                                            discount={item.get('discount')}
                                            price={item.get('price')}
                                            name={item.get('name')}
                                            id={item.get('id')}
                                            img={item.get('img')}
                                            key={index}
                                        />
                                    ))}
                            </div>
                        </>
                    )}

                    <button onClick={page === 3 ? closeTutorial : this._next}>
                        {page === 3 ? 'Start playing' : 'Next'}
                    </button>
                    <div
                        className={Styles.statusBar}
                        style={{
                            width: `${page * 33}%`,
                        }}
                    >{`Step ${page}/3`}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FistTimeUX);
