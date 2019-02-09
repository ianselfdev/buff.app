//Core
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

//Components
import MarketItem from '../MarketItem';

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

class MarketRecomendations extends Component {
    componentDidMount() {
        const { fetchMarketItemsAsync } = this.props;
        fetchMarketItemsAsync();
    }

    render() {
        const { market } = this.props;

        return (
            <Fragment>
                <div className={Styles.titleBox}>Recomended for you</div>
                <div className={Styles.recomendations}>
                    {market.get('market').size > 0 ? (
                        market
                            .get('market')
                            .map((item, index) => (
                                <MarketItem
                                    shortDescription={item.get('descriptionShort')}
                                    discount={item.get('discount')}
                                    games={item.get('games')}
                                    price={item.get('price')}
                                    name={item.get('name')}
                                    amount={item.get('count')}
                                    id={item.get('id')}
                                    tradable={item.get('tradable')}
                                    description={item.get('description')}
                                    expire={item.get('expire')}
                                    img={item.get('img')}
                                    key={index}
                                />
                            ))
                    ) : (
                        <p className={Styles.noRecomendations}>No recomendations for you now :(</p>
                    )}
                </div>
                <div className={Styles.button}>View more</div>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketRecomendations);
