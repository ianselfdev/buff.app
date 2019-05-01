//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.module.scss';

//Components
import TopBarLinks from '../TopBarLinks';
import ReactTooltip from 'react-tooltip';

//Instruments
import close from '../../theme/svg/close.svg';
import minimize from '../../theme/svg/minimize.svg';
import discord from '../../theme/svg/discord.svg';
import question from '../../theme/svg/question.svg';

export default class TopControlBar extends Component {
    state = {
        linksOpened: false,
    };

    /* eslint-disable no-undef */
    _close = () => {
        // overwolf.windows.getCurrentWindow((data) => {
        //     const { id } = data.window;

        //     overwolf.windows.close(id, (data) => {
        //         console.log(data);
        //     });
        // });

        overwolf.windows.getMainWindow().close();
    };

    _minimize = () => {
        overwolf.windows.getCurrentWindow((data) => {
            const { id } = data.window;

            overwolf.windows.minimize(id, (data) => {
                console.log(data);
            });
        });
    };

    _onMouseDown = (e) => {
        const {
            button,
            target: { className },
        } = e;

        if (button !== 0 || className !== Styles.container) {
            return null;
        }

        overwolf.windows.getCurrentWindow((data) => {
            const { id } = data.window;
            overwolf.windows.dragMove(id);
        });
    };
    /* eslint-enable no-undef */

    _toggleLinks = (e) => {
        this.setState((prevState) => ({
            linksOpened: !prevState.linksOpened,
        }));
    };

    render() {
        const { linksOpened } = this.state;

        return (
            <div className={Styles.container} onMouseDown={this._onMouseDown}>
                <img className={Styles.info} src={question} alt="" onClick={this._toggleLinks} />
                <a href="https://discord.gg/fAhV4SY" target="_blank" rel="noopener noreferrer">
                    <img
                        className={Styles.discord}
                        src={discord}
                        alt=""
                        data-for="bottom_tooltip"
                        data-tip="Our Discord"
                    />
                </a>
                <img className={Styles.minimize} src={minimize} alt="" onClick={this._minimize} />
                <img className={Styles.close} src={close} alt="" onClick={this._close} />
                <ReactTooltip
                    id="bottom_tooltip"
                    place="bottom"
                    type="dark"
                    effect="solid"
                    border
                />
                {linksOpened && <TopBarLinks />}
            </div>
        );
    }
}
