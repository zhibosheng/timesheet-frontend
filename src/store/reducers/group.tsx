import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Object= {
    groupId: 0,
    groupName: "",
    groupDescription: "",
    createTime: null,
    updateTime: null,
    users: [],
    error: null,
    loading: false,
};

const fetchGroupStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchGroupInformationSuccess = (state:any, action:any) => {
    return updateObject( state, {
        groupId: action.groupId,
        groupName: action.groupName,
        groupDescription: action.groupDescription,
        createTime: action.createTime,
        updateTime: action.updateTime,
        error: null,
        loading: false
    });
};

const fetchGroupUsersSuccess = (state:any, action:any) => {
    return updateObject( state, {
        users : action.users,
        error: null,
        loading: false
    });
};

const fetchGroupFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_GROUP_START: return fetchGroupStart(state, action);
        case actionTypes.FETCH_GROUP_INFORMATION_SUCCESS: return fetchGroupInformationSuccess(state, action);
        case actionTypes.FETCH_GROUP_USERS_SUCCESS: return fetchGroupUsersSuccess(state, action);
        case actionTypes.FETCH_GROUP_FAIL: return fetchGroupFail(state, action);
        default:
            return state;
    }
};

export default reducer;