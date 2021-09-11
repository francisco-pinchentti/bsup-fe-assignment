import { all } from 'redux-saga/effects';
import reportSagas from './report';

export default function* rootSaga() {
    yield all([
        ...reportSagas
    ]);
}
