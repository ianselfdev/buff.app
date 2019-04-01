//Core
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

const prod = process.env.NODE_ENV === 'production';
mixpanel.init('d0e6c0047d7794ca265c1829b7523c89');

export const Analytics = {
    //event data shape:
    // {
    //   category: string,
    //   value: number,
    // }
    event: (name, data, callback) => {
        if (prod) {
            ReactGA.event({
                category: data.category,
                action: name,
                value: data.value || 1,
            });
            mixpanel.track(name, data, callback);
        } else {
            console.log('Analytics are disabled for !production');
        }
    },

    appOpened: () => {
        if (prod) {
            ReactGA.event({
                action: 'App Opened',
                category: 'Auth actions',
                label: `Session start time: ${new Date().toISOString()}`,
            });
            mixpanel.track('App Opened', { sessionStartTime: new Date().toISOString() });
        }
    },

    tutorialViewed: () => {
        if (prod) {
            ReactGA.event({
                action: 'Tutorial viewed',
                category: 'In-app actions',
                label: `Tutorial viewed`,
            });
            mixpanel.track('Tutorial viewed');
        }
    },

    tutorialClosed: () => {
        if (prod) {
            ReactGA.event({
                action: 'Tutorial Closed',
                category: 'In-app actions',
                label: `Tutorial Closed`,
            });
            mixpanel.track('Tutorial Closed');
        }
    },

    //! need to add login method
    userLogin: (userData) => {
        if (prod) {
            ReactGA.event({
                action: 'User logged in',
                category: 'Auth actions',
                label: JSON.stringify(userData),
            });
            mixpanel.track('User logged in', userData);
        }
    },

    userStartsSignUp: () => {
        if (prod) {
            ReactGA.event({
                action: 'User starts signing up',
                category: 'Auth actions',
            });
            mixpanel.track('User starts signing up');
        }
    },

    userFinishesSignUp: (userData) => {
        if (prod) {
            ReactGA.event({
                action: 'User finishes signing up. Profile created',
                category: 'Auth actions',
            });
            mixpanel.track('User finishes signing up. Profile created', userData);
        }
    },

    userStartsGame: (gameName) => {
        if (prod) {
            ReactGA.event({
                action: 'User starts a game',
                category: 'In-app actions',
            });
            mixpanel.track('User starts a game', gameName);
        }
    },

    // userCompletesTier: (tierData) => {
    //     if(prod) {
    //         ReactGA.event({
    //             action: 'User completes tier',
    //             category: 'In-app actions',
    //         });
    //         mixpanel.track('User completes tier', tierData)
    //     }
    // },

    userPurchasesItem: (userData, itemData) => {
        if (prod) {
            ReactGA.event({
                action: 'User makes a purchase',
                category: 'In-app actions',
                label: JSON.stringify({
                    userData,
                    itemData,
                    timeStamp: new Date().toISOString(),
                }),
            });
            mixpanel.track('User makes a purchase', {
                userData,
                itemData,
                timeStamp: new Date().toISOString(),
            });
        }
    },

    userClicksInviteButton: (userData) => {
        if (prod) {
            ReactGA.event({
                action: 'User clicks invite button',
                category: 'In-app actions',
                label: JSON.stringify({
                    userData,
                    timeStamp: new Date().toISOString(),
                }),
            });
            mixpanel.track('User clicks invite button', {
                userData,
                timeStamp: new Date().toISOString(),
            });
        }
    },

    userVisitsMarketplace: (userData) => {
        if (prod) {
            ReactGA.event({
                action: 'User visits marketplace',
                category: 'In-app actions',
                label: JSON.stringify({
                    userData,
                    timeStamp: new Date().toISOString(),
                }),
            });
            mixpanel.track('User visits marketplace', {
                userData,
                timeStamp: new Date().toISOString(),
            });
        }
    },

    userGetsBonus: (userData, bonusData) => {
        if (prod) {
            ReactGA.event({
                action: 'User visits marketplace',
                category: 'In-app actions',
                label: JSON.stringify({
                    userData,
                    bonusData,
                    timeStamp: new Date().toISOString(),
                }),
            });
            mixpanel.track('User visits marketplace', {
                userData,
                bonusData,
                timeStamp: new Date().toISOString(),
            });
        }
    },
};
