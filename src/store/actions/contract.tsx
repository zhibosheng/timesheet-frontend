import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchContractStart= () => {
    return {
        type: actionTypes.FETCH_CONTRACT_START,
    };
};


export const fetchContractUsersSuccess = (users:any) => {
    return {
        type: actionTypes.FETCH_CONTRACT_USERS_SUCCESS,
        users: users,
    };
};

export const fetchContractFail = (error:any) => {
    return {
        type: actionTypes.FETCH_CONTRACT_FAIL,
        error: error
    };
};

export const fetchContractUsers = (contractId: number) => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/contract/users/" + contractId;
        axios.get(url)
        .then(response => {
            dispatch(fetchContractUsersSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}

export const addContractUserByName = (contractId:number, userName:string) => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/contract/addUserByName/" + contractId + "/" + userName;
        const Data:Object = {};
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
        axios.post(url,Data,config)
        .then(response => {
            dispatch(fetchContractUsersSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}



export const deleteContractUser = (contractId:number, userId:number) => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/contract/deleteUser/" + contractId + "/" + userId;
        const Data:Object = {};
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
        axios.post(url,Data,config)
        .then(response => {
            dispatch(fetchContractUsersSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}