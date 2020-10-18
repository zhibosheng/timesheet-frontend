import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    };
};

export const fetchUserSuccess = (userId:number, userName:String,
    firstName:String, lastName:String, password:String, email:String,
    phone:String, avatarUrl:String,createTime:Date,updateTime:Date) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        userId: userId,
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        phone: phone,
        avatarUrl: avatarUrl,
        createTime: createTime,
        updateTime: updateTime
    };
};

export const fetchUserFail = (error:any) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    };
};


export const getUserByName  = (userName:String) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());

        const url:string = "http://localhost:8080/user/name/"+userName;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserSuccess(response.data.userId,response.data.userName,
                response.data.firstName, response.data.lastName, response.data.password,
                response.data.email, response.data.phone, response.data.avatarUrl,
                response.data.createTime, response.data.updateTime));            
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
};