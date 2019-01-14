//Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Styles
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    isFetching: state.ui.get('isFetching'),
});

class Spinner extends Component {
    render() {
        const { isFetching } = this.props;

        return isFetching ? (
            <div className={Styles.loaderInner}>
                <div className={Styles.loaderLineWrap}>
                    <div className={Styles.loaderLine} />
                </div>
                <div className={Styles.loaderLineWrap}>
                    <div className={Styles.loaderLine} />
                </div>
                <div className={Styles.loaderLineWrap}>
                    <div className={Styles.loaderLine} />
                </div>
                <div className={Styles.loaderLineWrap}>
                    <div className={Styles.loaderLine} />
                </div>
                <div className={Styles.loaderLineWrap}>
                    <div className={Styles.loaderLine} />
                </div>
            </div>
        ) : null;
    }
}

export default connect(mapStateToProps)(Spinner);
