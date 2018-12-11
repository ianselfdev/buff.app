import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import routes from './routes';
import configureStore from './Store/store';
import './main-style.scss';

//Analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-114852827-2', { debug: false });
ReactGA.set({ checkProtocolTask: null });
ReactGA.pageview(window.location.pathname + window.location.search);

const syncHistoryWithStore = (store, history) => {
    const { routing } = store.getState();
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};

const initialState = {
    loggedInTracker: false,
};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

let rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);
const rootE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
    </Provider>,
    rootE,
);
