//Types
import { types } from './types';

export const newsActions = {
    //Sync
    fillNews: (news) => {
        return {
            type: types.FILL_NEWS,
            payload: news,
        };
    },

    //Async
    fetchNewsAsync: () => {
        return {
            type: types.FETCH_NEWS_ASYNC,
        };
    },
};
