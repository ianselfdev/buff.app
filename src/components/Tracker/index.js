//Core
import React, { Component } from 'react';

//Styles
import './index.scss';

import { load } from './instruments-a/main';

export default class Tracker extends Component {
    componentDidMount = () => {
        load();
    };

    render() {
        return (
            <div id="container">
                <h3 id="title">Buff Achievement Tracker</h3>
                <h4 id="info">Welcome to Buff Achievement Tracker</h4>
                <div id="explanation">
                    <p>
                        In order to get started you have to sign events
                        transactions with your credentials.
                    </p>
                    <p>
                        You received it via email after registration in buff.app
                    </p>
                </div>
                <form id="applyForm">
                    <input
                        type="text"
                        placeholder="Put here your address"
                        id="senderId"
                    />
                    <input
                        type="text"
                        placeholder="Put here your secret"
                        id="passphrase"
                    />
                </form>
                <br />
                <button id="validUser" class="btn">
                    Apply
                </button>
                <button id="lorchu" class="btn">
                    Logout or Change User
                </button>
                <button id="exit" class="btn">
                    Exit
                </button>
            </div>
        );
    }
}
