import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Object= {
    users: [],
    error: null,
    loading: false,
};

const fetchContractStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchContractUsersSuccess = (state:any, action:any) => {
    return updateObject( state, {
        users : action.users,
        error: null,
        loading: false
    });
};

const fetchContractFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};


const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CONTRACT_START: return fetchContractStart(state, action);
        case actionTypes.FETCH_CONTRACT_USERS_SUCCESS: return fetchContractUsersSuccess(state, action);
        case actionTypes.FETCH_CONTRACT_FAIL: return fetchContractFail(state, action);
        default:
            return state;
    }
};

export default reducer;