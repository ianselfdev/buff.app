//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

export default class ErrorCatcher extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, stack) {
        console.log('ERROR: ', error.message);
        console.log('STACK: ', stack.componentStack);

        this.setState({
            error: true,
        });
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className={Styles.catcher}>
                    <span>A mysterious &nbsp;error &nbsp;occured.</span>
                    <p>
                        Our space 🛰 &nbsp;engineers strike team &nbsp;is already working &nbsp;in
                        order to fix that for you!
                    </p>
                </section>
            );
        }

        return children;
    }
}
