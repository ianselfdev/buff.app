//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class Error extends Component {
    render() {
        return (
            <div className={Styles.bg}>
                <div className={Styles.container}>
                    <p>Oops, something went wrong :(</p>
                </div>
            </div>
        );
    }
}
