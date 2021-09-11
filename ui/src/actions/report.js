export const Types = {
    GET_CASES_START: 'action/cases/get',
    GET_CASES_FINISHED: 'action/cases/get/ok',
    GET_STATES_START: 'action/states/get',
    GET_STATES_FINISHED: 'action/states/get/ok',
    GET_DETAIL_START: 'action/detail/get',
    GET_DETAIL_FINISHED: 'action/detail/get/ok',
    HIDE_DETAIL_MODAL: 'action/detail/hide'
};

export const getCasesStart = ({ regionFilter, timeFilter }) => ({
    type: Types.GET_CASES_START,
    payload: {
        regionFilter,
        timeFilter
    }
});

export const getCasesFinished = ({
    regionFilter,
    timeFilter,
    cases,
    deaths,
    labels
}) => ({
    type: Types.GET_CASES_FINISHED,
    payload: {
        regionFilter,
        timeFilter,
        cases,
        deaths,
        labels
    }
});

export const getStatesStart = () => ({
    type: Types.GET_STATES_START
});

export const getStatesFinished = ({ states }) => ({
    type: Types.GET_STATES_FINISHED,
    payload: {
        states
    }
});

export const getDetailStart = ({ date }) => ({
    type: Types.GET_DETAIL_START,
    payload: {
        date
    }
});

export const getDetailFinished = ({ date, states, totals }) => ({
    type: Types.GET_DETAIL_FINISHED,
    payload: {
        date,
        states,
        totals
    }
});

export const hideDetailModal = () => ({
    type: Types.HIDE_DETAIL_MODAL
});
