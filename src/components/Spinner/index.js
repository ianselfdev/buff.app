//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class Spinner extends Component {
    render() {
        return (
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
        );
    }
}
