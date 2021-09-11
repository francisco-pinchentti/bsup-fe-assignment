import { Types as ReportActionTypes } from '../actions/report';

const INITIAL_STATE = {
    regionFilterOptions: [],
    chartConfig: null,
    detail: {
        states: [],
        totals: null,
        date: null
    },
    showDetailDrilldown: false
};

const createChartConfigFor = (labels, cases, deaths) => {
    return {
        labels,
        datasets: [{
            label: 'Deaths',
            backgroundColor: "#caf270",
            data: deaths,
            stack: 'STACK001',
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            beginAtZero: true
        }, {
            label: 'Cases',
            backgroundColor: "#45c490",
            data: cases,
            stack: 'STACK001',
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            beginAtZero: true
        }],
    }
}

export default function report(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ReportActionTypes.GET_STATES_FINISHED:
            const statesAsOptions = action.payload.states.map(s => ({ id: s.fips, description: s.state }));
            const regionFilterOptions = [
                { id: 'all', description: 'All' },
                ...statesAsOptions
            ];
            return {
                ...state,
                regionFilterOptions
            }
        case ReportActionTypes.GET_CASES_FINISHED:
            const { labels, cases, deaths } = action.payload;
            const chartConfig = createChartConfigFor(labels, cases, deaths);
            return {
                ...state,
                chartConfig
            };
        case ReportActionTypes.GET_DETAIL_FINISHED:
            const detail = {
                states: action.payload.states,
                totals: action.payload.totals,
                date: action.payload.date
            }
            return {
                ...state,
                detail,
                showDetailDrilldown: true
            };
        case ReportActionTypes.HIDE_DETAIL_MODAL:
            return {
                ...state,
                showDetailDrilldown: false
            };
        default:
            return state;
    }
}
