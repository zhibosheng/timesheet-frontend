import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchContractStart= () => {
    return {
        type: actionTypes.FETCH_CONTRACT_START,
    };
};


export const fetchContractInformationSuccess = (contractId:number, contractName:string, company:string, manager:Object, startDate:Date, endDate:Date, createTime:Date, updateTime:Date) => {
    return {
        type: actionTypes.FETCH_CONTRACT_INFORMATION_SUCCESS,
        contractId: contractId,
        contractName: contractName,
        company: company,
        manager: manager,
        startDate: startDate,
        endDate:endDate,
        createTime: createTime,
        updateTime: updateTime,
    };
};


export const fetchContractUsersSuccess = (users:any) => {
    return {
        type: actionTypes.FETCH_CONTRACT_USERS_SUCCESS,
        users: users,
    };
};

export const fetchAllContractsSuccess = (contracts:any) => {
    return {
        type: actionTypes.FETCH_ALL_CONTRACTS_SUCCESS,
        contracts: contracts,
    };
};

export const fetchContractFail = (error:any) => {
    return {
        type: actionTypes.FETCH_CONTRACT_FAIL,
        error: error
    };
};



// export const createContract = (contractName:string, company:string, managerName:string, startDate:Date, endDate:Date) => {
//     return (dispatch:any) => {
//         dispatch(fetchContractStart());
//         const Data:Object = {
//         };
//         let config = {
//             headers:{'Content-Type': 'application/json; charset=utf-8'}
//         }
//         const url:string = "http://localhost:8080/createContract/" + contractName + "/" + company + "/" + managerName;
//         axios.post(url, Data,config)
//         .then(response => {
//             dispatch(fetchContractInformationSuccess(response.data.contractId,response.data.contractName, response.data.company,
//                 response.data.manager, response.data.startDate, response.data.endDate, response.data.createTime, response.data.updateTime));       
//         })
//         .catch(err => {
//             dispatch(fetchContractFail(err.message));
//         });
//     }
// }

export const createContract = (contractName:string, company:string, managerName:string, startDate:Date, endDate:Date) => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/user/name/"+managerName;
        axios.get(url)
        .then(response => {
            const contractUrl:string = "http://localhost:8080/contract";
            const Data:Object = {
                contractName: contractName,
                company: company,
                manager: response.data,
                startDate: startDate,
                endDate: endDate,
            };
            let config = {
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            }
            axios.post(contractUrl, Data, config)
            .then(response => {
                dispatch(fetchContractInformationSuccess(response.data.contractId,response.data.contractName, response.data.company,
                    response.data.manager, response.data.startDate, response.data.endDate, response.data.createTime, response.data.updateTime));  
            }).catch(e => {
                dispatch(fetchContractFail(e.message));
            });        
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}

export const fetchContractInformation = (contractId: number) => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/contract/" + contractId;
        axios.get(url)
        .then(response => {
            dispatch(fetchContractInformationSuccess(response.data.contractId,response.data.contractName, response.data.company,
                response.data.manager, response.data.startDate, response.data.endDate, response.data.createTime, response.data.updateTime));       
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}

// export const updateContractInformation = (contractId:number, contractName:string, company:string, managerName:string, startDate:Date, endDate: Date) => {
//     return (dispatch:any) => {
//         dispatch(fetchContractStart());
//         const Data:Object = {
//             contractId: contractId,
//             contractName: contractName,
//             company: company,
//             startDate: startDate, 
//             endDate: endDate
//         };
//         let config = {
//             headers:{'Content-Type': 'application/json; charset=utf-8'}
//         }
//         const url:string = "http://localhost:8080/contract";
//         axios.put(url, Data,config)
//         .then(response => {
//             dispatch(fetchContractInformationSuccess(response.data.contractId,response.data.contractName, response.data.company,
//                 response.data.manager, response.data.startDate, response.data.endDate, response.data.createTime, response.data.updateTime));       
//         })
//         .catch(err => {
//             dispatch(fetchContractFail(err.message));
//         });
//     }
// }

export const updateContractInformation = (contractId:number, contractName:string, company:string, managerName:string, startDate:Date, endDate: Date) => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/user/name/"+managerName;
        axios.get(url)
        .then(response => {
            const contractUrl:string = "http://localhost:8080/contract";
            const Data:Object = {
                contractId:contractId,
                contractName: contractName,
                company: company,
                manager: response.data,
                startDate: startDate,
                endDate: endDate,
            };
            let config = {
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            }
            axios.put(contractUrl, Data, config)
            .then(response => {
                dispatch(fetchContractInformationSuccess(response.data.contractId,response.data.contractName, response.data.company,
                    response.data.manager, response.data.startDate, response.data.endDate, response.data.createTime, response.data.updateTime));  
            }).catch(e => {
                dispatch(fetchContractFail(e.message));
            });        
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}

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

export const fetchAllContracts = () => {
    return (dispatch:any) => {
        dispatch(fetchContractStart());
        const url:string = "http://localhost:8080/contract/allContracts";
        axios.get(url)
        .then(response => {
            dispatch(fetchAllContractsSuccess(response.data));       
        })
        .catch(err => {
            dispatch(fetchContractFail(err.message));
        });
    }
}