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

export const fetchUserRolesSuccess = (roles:any) => {
    return {
        type: actionTypes.FETCH_USER_ROLES_SUCCESS,
        roles: roles,
    };
};


export const fetchUserManageGroupsSuccess = (manageGroups:any) => {
    return {
        type: actionTypes.FETCH_USER_MANAGEGROUPS_SUCCESS,
        manageGroups: manageGroups,
    };
};

export const fetchUserJoinGroupsSuccess = (joinGroups:any) => {
    return {
        type: actionTypes.FETCH_USER_JOINGROUPS_SUCCESS,
        joinGroups: joinGroups,
    };
};

export const fetchUserManageContractsSuccess = (manageContracts:any) => {
    return {
        type: actionTypes.FETCH_USER_MANAGECONTRACTS_SUCCESS,
        manageContracts: manageContracts,
    };
};


export const fetchUserJoinContractsSuccess = (joinContracts:any) => {
    return {
        type: actionTypes.FETCH_USER_JOINCONTRACTS_SUCCESS,
        joinContracts: joinContracts,
    };
};

export const fetchUserTimesheetsSuccess = (timesheets:any) => {
    return {
        type: actionTypes.FETCH_USER_TIMESHEETS_SUCCESS,
        timesheets: timesheets,
    };
};

export const fetchAllUserSuccess = (users:any) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: users,
    };
};

export const fetchUserFail = (error:any) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    };
};


export const fetchUserByName  = (userName:string) => {
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
            .then(res => {
                dispatch(fetchUserAvatarSuccess(res.data.url))
            }).catch(e => {
                dispatch(fetchUserFail(e.message));
            }); 
            const roleUrl:string = "http://localhost:8080/user/roles/"+response.data.userId;
            axios.get(roleUrl)
            .then(result => {
                dispatch(fetchUserRolesSuccess(result.data))
            }).catch(e => {
                dispatch(fetchUserFail(e.message));
            });         
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
};

export const updateUserInformation = (userId:number, userName: string, firstName: string, lastName: string, password:string, email: string, phone: string, avatarUrl:string) => {
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
            avatarUrl: avatarUrl,
        };
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
        const url:string = "http://localhost:8080/user/"
        axios.put(url, Data, config)
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

export const updateUserPassword = (userId:number, oldPassword:string, newPassword:string) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/changePassword/" + userId + "/" + oldPassword + "/" + newPassword ;
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
}

export const updateUserAvatar = (userId: number, selectedFile:string ) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/avatar/" + userId;
        const Data = new FormData();
        Data.append('file', selectedFile);
        let config = {
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        }
        axios.post(url, Data,config)
        .then(response => {
            dispatch(fetchUserSuccess(response.data.userId,response.data.userName,
                response.data.firstName, response.data.lastName, response.data.password,
                response.data.email, response.data.phone, response.data.avatarUrl,
                response.data.createTime, response.data.updateTime));
            const avatarUrl:string = "http://localhost:8080/user/avatar/"+response.data.userId;
            axios.get(avatarUrl)
            .then(res => {
                dispatch(fetchUserAvatarSuccess(res.data.url))
            }).catch(e => {
                dispatch(fetchUserFail(e.message));
            });             
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}


export const fetchUserManageGroupsById = (userId:number) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/manageGroups/"+userId;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserManageGroupsSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}

export const fetchUserJoinGroupsById = (userId:number) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/joinGroups/"+userId;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserJoinGroupsSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}

export const fetchUserManageContractsById = (userId:number) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/manageContracts/"+userId;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserManageContractsSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}


export const fetchUserJoinContractsById = (userId:number) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/contracts/"+userId;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserJoinContractsSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}

export const fetchTimesheetsByUserIdAndDate = (userId:number, startDate:Date, endDate: Date) => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/myTimesheet/"+userId+"/"+startDate+"/"+endDate;
        axios.get(url)
        .then(response => {
            dispatch(fetchUserTimesheetsSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}

export const fetchAllUsers = () => {
    return (dispatch:any) => {
        dispatch(fetchUserStart());
        const url:string = "http://localhost:8080/user/allUsers";
        axios.get(url)
        .then(response => {
            dispatch(fetchAllUserSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchUserFail(err.message));
        });
    }
}