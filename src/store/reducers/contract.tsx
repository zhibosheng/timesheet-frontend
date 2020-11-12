import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Object= {
    contractId: 0,
    contractName: "",
    company: "",
    manager: null,   
    startDate: null,
    endDate: null,
    createTime: null,
    updateTime: null,
    users: [],
    contracts:[],
    error: null,
    loading: false,
};

const fetchContractStart = ( state:any, action:any) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchContractInformationSuccess = (state:any, action:any) => {
    return updateObject( state, {
        contractId: action.contractId,
        contractName: action.contractName,
        company: action.company,
        manager: action.manager,
        startDate: action.startDate,
        endDate: action.endDate,
        createTime: action.createTime,
        updateTime: action.updateTime,
        error: null,
        loading: false
    });
};


const fetchContractUsersSuccess = (state:any, action:any) => {
    return updateObject( state, {
        users : action.users,
        error: null,
        loading: false
    });
};

const fetchAllContractsSuccess = (state:any, action:any) => {
    return updateObject( state, {
        contracts : action.contracts,
        error: null,
        loading: false
    });
};


const fetchContractFail = (state:any, action:any) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};


const reducer = ( state:any = initialState, action:any ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CONTRACT_START: return fetchContractStart(state, action);
        case actionTypes.FETCH_CONTRACT_INFORMATION_SUCCESS: return fetchContractInformationSuccess(state, action);
        case actionTypes.FETCH_CONTRACT_USERS_SUCCESS: return fetchContractUsersSuccess(state, action);
        case actionTypes.FETCH_ALL_CONTRACTS_SUCCESS: return fetchAllContractsSuccess(state, action);
        case actionTypes.FETCH_CONTRACT_FAIL: return fetchContractFail(state, action);
        default:
            return state;
    }
};

export default reducer;