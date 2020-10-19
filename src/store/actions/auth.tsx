import axios from 'axios';
import * as actionTypes from './actionTypes';
import { getUserByName } from './user';




export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (Authorization:string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        Authorization: Authorization,
    };
};

export const authFail = (error:any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime:number) => {
    return (dispatch:any) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const auth = (userName:string, password:string) => {
    return (dispatch:any) => {
        dispatch(authStart());
        const Data:Object = {
            userName: userName,
            password: password,
        };
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
         
        const url:string = "http://localhost:8080/auth";
        axios.post(url, Data,config)
        .then(response => {
            // check expire date
            const expirationDate:Date = new Date(new Date().getTime() + 7200 * 1000);
            localStorage.setItem('Authorization', response.data.Authorization);
            localStorage.setItem('expirationDate', expirationDate.toString());
            dispatch(authSuccess(response.data.Authorization));
            dispatch(checkAuthTimeout(30));
            dispatch(getUserByName(userName));           
        })
        .catch(err => {
            dispatch(authFail(err.message));
        });
    };
};
