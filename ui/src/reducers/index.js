import { combineReducers } from 'redux';
import ReportReducer from './report';

export default combineReducers({
    report: ReportReducer
});
