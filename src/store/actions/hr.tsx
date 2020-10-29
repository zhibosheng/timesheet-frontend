import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchHRDataStart= () => {
    return {
        type: actionTypes.FETCH_HRDATA_START
    };
};


export const fetchAllUserSuccess = (users:any) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: users,
    };
};

export const fetchHRDataFail = (error:any) => {
    return {
        type: actionTypes.FETCH_HRDATA_FAIL,
        error: error
    };
};


export const fetchAllUsers = () => {
    return (dispatch:any) => {
        dispatch(fetchHRDataStart());
        const url:string = "http://localhost:8080/user/allUsers";
        axios.get(url)
        .then(response => {
            dispatch(fetchAllUserSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchHRDataFail(err.message));
        });
    }
}