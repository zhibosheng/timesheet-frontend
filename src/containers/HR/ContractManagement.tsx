import { useEffect, Fragment } from "react";
import React from "react";
import { connect } from "react-redux";

import * as contractActions from '../../store/actions/contract';
import AllContractsTable from "../../components/Table/AllContractsTable";

const ContractManagement = (props:any) => {
    useEffect(() => {
        props.fetchAllContracts();
    },[]);
    return (
    <Fragment>
        <AllContractsTable contracts= {props.contracts}/>
    </Fragment>
    );
}

const mapStateToProps = (state: any) => {
    return {
        contracts:state.contract.contracts,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllContracts: () => dispatch(contractActions.fetchAllContracts())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractManagement);