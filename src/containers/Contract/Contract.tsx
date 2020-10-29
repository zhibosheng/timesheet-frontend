import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import ContractTable from '../../components/Table/ContractTable';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/user';
import { RootState } from '../../shared/type';

const Contract = (props:any) => {
    const [userId, setUserId] = useState(props.userId);

    useEffect(() => {
        props.fetchUserContractsById(userId);
    },[]);
    return (<ContractTable contracts= {props.contracts}/>);
}

const mapStateToProps = (state: any) => {
    return {
        userId: state.user.userId,
        contracts:state.user.contracts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserContractsById: (userId:number) => dispatch(userActions.fetchUserContractsById(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contract);

// const Contract = (props:any) => {
//     const userId = useSelector((state: RootState) => state.user.userId);
//     const contracts = useSelector((state: RootState) => state.user.contracts);
//     const dispatch = useDispatch();
//     dispatch(actions.fetchUserContractsById(userId));
//     return (<ContractTable contracts= {contracts}/>);
// }

// export default Contract;