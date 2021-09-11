import axios from 'axios';

export const getReport = (regionFilter, timeFilter) => {
    return axios.get('/report', {
        params: {
            regionFilter,
            timeFilter
        }
    });
};

export const getStates = () => {
    return axios.get('/states');
};

export const getDetail = (date) => {
    return axios.get(`/detail/${date}`);
};
