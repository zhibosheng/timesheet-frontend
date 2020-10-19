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
    authRedirectPath: '/'
};

const registerStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const registerSuccess = (state:any, action:any) => {
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
        error: null,
        loading: false
     } );
};

const registerFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const setRegisterRedirectPath = (state:any, action:any) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.SET_REGISTER_REDIRECT_PATH: return setRegisterRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;