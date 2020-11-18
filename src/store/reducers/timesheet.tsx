import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Object= {
    timesheets:[],
    error: null,
    loading: false,
};

const fetchTimesheetStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchTimesheetsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        timesheets : action.timesheets,
        error: null,
        loading: false
    });
};

const fetchTimesheetFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};


const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_TIMESHEET_START: return fetchTimesheetStart(state, action);
        case actionTypes.FETCH_TIMESHEETS_SUCCESS: return fetchTimesheetsSuccess(state, action);
        case actionTypes.FETCH_TIMESHEET_FAIL: return fetchTimesheetFail(state, action);
        default:
            return state;
    }
};

export default reducer;