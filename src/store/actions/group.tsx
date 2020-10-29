import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchGroupStart= () => {
    return {
        type: actionTypes.FETCH_GROUP_START,
    };
};


export const fetchGroupUsersSuccess = (users:any) => {
    return {
        type: actionTypes.FETCH_GROUP_USERS_SUCCESS,
        users: users,
    };
};

export const fetchGroupFail = (error:any) => {
    return {
        type: actionTypes.FETCH_GROUP_FAIL,
        error: error
    };
};


export const fetchGroupUsers = (groupId: number) => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/group/users/" + groupId;
        axios.get(url)
        .then(response => {
            dispatch(fetchGroupUsersSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}

export const addGroupUserByName = (groupId:number, userName:string) => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/group/addUserByName/" + groupId + "/" + userName;
        const Data:Object = {};
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
        axios.post(url,Data,config)
        .then(response => {
            dispatch(fetchGroupUsersSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}



export const deleteGroupUser = (groupId:number, userId:number) => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/group/deleteUser/" + groupId + "/" + userId;
        const Data:Object = {};
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
        axios.post(url,Data,config)
        .then(response => {
            dispatch(fetchGroupUsersSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}

