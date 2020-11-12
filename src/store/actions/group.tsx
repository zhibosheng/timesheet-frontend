import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchGroupStart= () => {
    return {
        type: actionTypes.FETCH_GROUP_START,
    };
};

export const fetchGroupInformationSuccess = (groupId:number, groupName:string, groupDescription:string, manager:Object, createTime:Date, updateTime:Date) => {
    return {
        type: actionTypes.FETCH_GROUP_INFORMATION_SUCCESS,
        groupId: groupId,
        groupName: groupName,
        groupDescription: groupDescription,
        manager:manager,
        createTime: createTime,
        updateTime: updateTime,
    };
};

export const fetchGroupUsersSuccess = (users:any) => {
    return {
        type: actionTypes.FETCH_GROUP_USERS_SUCCESS,
        users: users,
    };
};

export const fetchAllGroupSuccess = (groups:any) => {
    return {
        type: actionTypes.FETCH_ALL_GROUPS_SUCCESS,
        groups: groups,
    };
};
export const fetchGroupFail = (error:any) => {
    return {
        type: actionTypes.FETCH_GROUP_FAIL,
        error: error
    };
};



// export const createGroup = (groupName:string, groupDescription:string, managerName:string) => {
//     return (dispatch:any) => {
//         dispatch(fetchGroupStart());
//         const Data:Object = {
//         };
//         let config = {
//             headers:{'Content-Type': 'application/json; charset=utf-8'}
//         }
//         const url:string = "http://localhost:8080/createGroup/" + groupName + "/" + groupDescription + "/" + managerName;
//         axios.post(url, Data,config)
//         .then(response => {
//             dispatch(fetchGroupInformationSuccess(response.data.groupId,response.data.groupName, response.data.groupDescription,
//                 response.data.manager, response.data.createTime, response.data.updateTime));       
//         })
//         .catch(err => {
//             dispatch(fetchGroupFail(err.message));
//         });
//     }
// }

export const createGroup = (groupName:string, groupDescription:string, managerName:string) => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/user/name/"+managerName;
        axios.get(url)
        .then(response => {
            const groupUrl:string = "http://localhost:8080/group";
            const Data:Object = {
                groupName: groupName,
                groupDescription: groupDescription,
                manager: response.data,
            };
            let config = {
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            }
            axios.post(groupUrl, Data, config)
            .then(response => {
                dispatch(fetchGroupInformationSuccess(response.data.groupId,response.data.groupName, response.data.groupDescription,
                    response.data.manager, response.data.createTime, response.data.updateTime));  
            }).catch(e => {
                dispatch(fetchGroupFail(e.message));
            });        
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}
export const fetchGroupInformation = (groupId: number) => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/group/" + groupId;
        axios.get(url)
        .then(response => {
            dispatch(fetchGroupInformationSuccess(response.data.groupId,response.data.groupName, response.data.groupDescription,
                response.data.manager, response.data.createTime, response.data.updateTime));       
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}

// export const updateGroupInformation = (groupId:number, groupName:string, groupDescription:string,managerName:string) => {
//     return (dispatch:any) => {
//         dispatch(fetchGroupStart());
//         const Data:Object = {
//             groupId: groupId,
//             groupName: groupName,
//             groupDescription: groupDescription,
//             // manager: manager,
//         };
//         let config = {
//             headers:{'Content-Type': 'application/json; charset=utf-8'}
//         }
//         const url:string = "http://localhost:8080/group";
//         axios.put(url, Data,config)
//         .then(response => {
//             dispatch(fetchGroupInformationSuccess(response.data.groupId,response.data.groupName, response.data.groupDescription,
//                 response.data.manager, response.data.createTime, response.data.updateTime));       
//         })
//         .catch(err => {
//             dispatch(fetchGroupFail(err.message));
//         });
//     }
// }

export const updateGroupInformation = (groupId:number, groupName:string, groupDescription:string,managerName:string) => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/user/name/"+managerName;
        axios.get(url)
        .then(response => {
            const groupUrl:string = "http://localhost:8080/group";
            const Data:Object = {
                groupId: groupId,
                groupName: groupName,
                groupDescription: groupDescription,
                manager: response.data,
            };
            let config = {
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            }
            axios.put(groupUrl, Data, config)
            .then(response => {
                dispatch(fetchGroupInformationSuccess(response.data.groupId,response.data.groupName, response.data.groupDescription,
                    response.data.manager, response.data.createTime, response.data.updateTime));  
            }).catch(e => {
                dispatch(fetchGroupFail(e.message));
            });        
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}

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

export const fetchAllGroups = () => {
    return (dispatch:any) => {
        dispatch(fetchGroupStart());
        const url:string = "http://localhost:8080/group/allGroups";
        axios.get(url)
        .then(response => {
            dispatch(fetchAllGroupSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchGroupFail(err.message));
        });
    }
}