import { takeEvery, take, call, put, fork } from 'redux-saga/effects';

import * as actions from '../actions/report';
import * as api from '../api/report';

function* getCases({ regionFilter, timeFilter }) {
    try {
        const response = yield call(api.getReport, regionFilter, timeFilter);
        const o = response.data.result.reduce( (acc, curr) => {
            acc.cases.push(curr.cases);
            acc.deaths.push(curr.deaths);
            acc.labels.push(curr.date);
            return acc;
        }, { cases: [], labels: [], deaths: []});
        yield put(actions.getCasesFinished({
            regionFilter,
            timeFilter,
            cases: o.cases,
            deaths: o.deaths,
            labels: o.labels
        }));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetCases() {
    while (true) {
        const { payload } = yield take(actions.Types.GET_CASES_START);
        yield call(getCases, payload);
    }
}

function* getStates() {
    try {
        const response = yield call(api.getStates);
        yield put(actions.getStatesFinished({ states: response.data.result }));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetStates() {
    yield takeEvery(actions.Types.GET_STATES_START, getStates);
}

function* getDetail({ date }) {
    try {
        const response = yield call(api.getDetail, date);
        const totals = response.data.result[0];
        const states = response.data.result.slice(1);
        yield put(actions.getDetailFinished({
            totals,
            states,
            date
        }));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetDetail() {
    while (true) {
        const { payload } = yield take(actions.Types.GET_DETAIL_START);
        yield call(getDetail, payload);
    }
}

const sagas = [
    fork(watchGetCases),
    fork(watchGetStates),
    fork(watchGetDetail),
];

export default sagas;
