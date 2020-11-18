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
    avatar:null,
    createTime: null,
    updateTime: null,
    manageGroups: [],
    joinGroups: [],
    manageContracts:[],
    joinContracts: [],
    timesheets:[],
    users: [],
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
        error: null,
        loading: false
    });
};

const fetchUserAvatarSuccess = (state:any, action:any) => {
    return updateObject( state, {
        avatar: action.avatar,
        error: null,
        loading: false
    });
};


const fetchUserManageGroupsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        manageGroups : action.manageGroups,
        error: null,
        loading: false
    });
};

const fetchUserJoinGroupsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        joinGroups : action.joinGroups,
        error: null,
        loading: false
    });
};

const fetchUserManageContractsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        manageContracts : action.manageContracts,
        error: null,
        loading: false
    });
};


const fetchUserJoinContractsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        joinContracts : action.joinContracts,
        error: null,
        loading: false
    });
};

const fetchUserTimesheetsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        timesheets : action.timesheets,
        error: null,
        loading: false
    });
};

const fetchAllUsersSuccess = (state:any, action:any) => {
    return updateObject( state, {
        users : action.users,
        error: null,
        loading: false
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
        case actionTypes.FETCH_USER_AVATAR_SUCCESS: return fetchUserAvatarSuccess(state, action);
        case actionTypes.FETCH_USER_MANAGEGROUPS_SUCCESS: return fetchUserManageGroupsSuccess(state, action);
        case actionTypes.FETCH_USER_JOINGROUPS_SUCCESS: return fetchUserJoinGroupsSuccess(state, action);
        case actionTypes.FETCH_USER_MANAGECONTRACTS_SUCCESS: return fetchUserManageContractsSuccess(state, action);
        case actionTypes.FETCH_USER_JOINCONTRACTS_SUCCESS: return fetchUserJoinContractsSuccess(state, action);
        case actionTypes.FETCH_USER_TIMESHEETS_SUCCESS: return  fetchUserTimesheetsSuccess(state, action);
        case actionTypes.FETCH_ALL_USERS_SUCCESS: return fetchAllUsersSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;