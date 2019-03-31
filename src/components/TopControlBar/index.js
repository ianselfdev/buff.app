//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Instruments
import close from '../../theme/svg/close.svg';
import minimize from '../../theme/svg/minimize.svg';
import discord from '../../theme/svg/discord.svg';
import info from '../../theme/svg/info.svg';

export default class TopControlBar extends Component {
    /* eslint-disable no-undef */
    _close = () => {
        overwolf.windows.getCurrentWindow((data) => {
            const { id } = data.window;

            overwolf.windows.close(id, (data) => {
                console.log(data);
                console.log('close');
            });
        });
    };

    _minimize = () => {
        overwolf.windows.getCurrentWindow((data) => {
            const { id } = data.window;

            overwolf.windows.minimize(id, (data) => {
                console.log(data);
                console.log('close');
            });
        });
    };

    _onMouseDown = () => {
        overwolf.windows.getCurrentWindow((data) => {
            const { id } = data.window;
            overwolf.windows.dragMove(id);
        });
    };

    render() {
        return (
            <div className={Styles.container} onMouseDown={this._onMouseDown}>
                <img className={Styles.info} src={info} alt="" />
                <a href="https://discord.gg/fAhV4SY" target="_blank" rel="noopener noreferrer">
                    <img className={Styles.discord} src={discord} alt="" />
                </a>
                <img className={Styles.minimize} src={minimize} alt="" onClick={this._minimize} />
                <img className={Styles.close} src={close} alt="" onClick={this._close} />
            </div>
        );
    }
}
