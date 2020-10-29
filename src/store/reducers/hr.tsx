import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Object= {
    users: [],
    error: null,
    loading: false,
};

const fetchHRDATAStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchAllUsersSuccess = (state:any, action:any) => {
    return updateObject( state, {
        users : action.users,
        error: null,
        loading: false
    });
};

const fetchHRDATAFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_HRDATA_START: return fetchHRDATAStart(state, action);
        case actionTypes.FETCH_ALL_USERS_SUCCESS: return fetchAllUsersSuccess(state, action);
        case actionTypes.FETCH_HRDATA_FAIL: return fetchHRDATAFail(state, action);
        default:
            return state;
    }
};

export default reducer;