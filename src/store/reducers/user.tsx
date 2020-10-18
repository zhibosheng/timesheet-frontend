import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Object= {
    userId: null,
    userName: null,
    firstName:null,
    lastName: null,
    password: null,
    email: null,
    phone: null,
    avatarUrl: null,
    createTime: null,
    updateTime: null,
    error: null,
    loading: false,
};

const fetchUserStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchUserSuccess = (state:any, action:any) => {
    return updateObject( state, {
        userId: action.userId,
        userName: action.userName,
        firstName: action.firstName,
        lastName: action.lastName,
        password: action.password,
        email: action.email,
        phone: action.phone,
        avatarUrl: action.avatarUrl,
        createTime: action.createTime,
        updateTime: action.updateTime,
    });
};

const fetchUserFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};


const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;