//Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

//App
import App from './core/App';

//Instruments
import './theme/index.scss';
import { store } from './bus/init/store';
import { history } from './bus/init/middleware/core';

//Analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-114852827-2', { debug: false });
ReactGA.set({ checkProtocolTask: null });
ReactGA.pageview(window.location.pathname + window.location.search);

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app'),
);
