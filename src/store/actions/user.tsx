import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    };
};

export const fetchUserSuccess = (userId:number, userName:string,
    firstName:string, lastName:string, password:string, email:string,
    phone:string, avatarUrl:string,createTime:Date,updateTime:Date) => {
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

export const fetchUserAvatarSuccess = (url:URL) => {
    return {
        type: actionTypes.FETCH_USER_AVATAR_SUCCESS,
        avatar: url,
    };
};

export const fetchUserFail = (error:any) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    };
};


export const getUserByName  = (userName:string) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());

        const url:string = "http://localhost:8080/user/name/"+userName;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserSuccess(response.data.userId,response.data.userName,
                response.data.firstName, response.data.lastName, response.data.password,
                response.data.email, response.data.phone, response.data.avatarUrl,
                response.data.createTime, response.data.updateTime));
            const avatarUrl:string = "http://localhost:8080/user/avatar/"+response.data.userId;
            axios.get(avatarUrl)
            .then(response => {
                dispatch(fetchUserAvatarSuccess(response.data.url))
            }).catch(err => {
                dispatch(fetchUserFail(err.message));
            });        
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
};

export const updateUserInformation = (userId:number, userName: string, firstName: string, lastName: string, password:string, email: string, phone: string) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const Data:Object = {
            userId:userId,
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
        const url:string = "http://localhost:8080/user/"
        axios.put(url, Data,config)
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
}