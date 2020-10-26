import axios from 'axios';
import * as actionTypes from './actionTypes';
import {auth} from './auth';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (userId:number, userName:string,
    firstName:string, lastName:string, password:string, email:string,
    phone:string, avatarUrl:string,createTime:Date,updateTime:Date) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
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

export const registerFail = (error:any) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};


export const register = (userName: string, firstName:string, lastName:string, password:string, email:string, phone:string) => {
    return (dispatch:any) => {
        dispatch(registerStart());
        const Data:Object = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            phone: phone,
        };
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
         
        const url:string = "http://localhost:8080/auth/registration";
        axios.post(url, Data,config)
        .then(response => {
            dispatch(registerSuccess(response.data.userId,response.data.userName,
                response.data.firstName, response.data.lastName, response.data.password,
                response.data.email, response.data.phone, response.data.avatarUrl,
                response.data.createTime, response.data.updateTime));
            
        })
        .catch(err => {
            dispatch(registerFail(err.message));
        });
    };
};