//Core
import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

// const prod = process.env.NODE_ENV === 'production';
const prod = true;
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
};
