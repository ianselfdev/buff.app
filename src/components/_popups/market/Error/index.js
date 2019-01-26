//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class Error extends Component {
    render() {
        const { message } = this.props;

        return (
            <div className={Styles.bg}>
                <div className={Styles.container}>
                    <p>
                        Sorry, we've encountered an error: <br />
                        {message}
                    </p>
                </div>
            </div>
        );
    }
}
