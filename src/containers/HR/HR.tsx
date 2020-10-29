import React, { useState, useEffect, Fragment } from 'react';
import AllUsersTable from '../../components/Table/AllUsersTable';
import * as hrActions from '../../store/actions/hr';
import { connect } from 'react-redux';
const HR = (props:any) => {
    useEffect(() => {
        props.fetchAllUsers();
    },[]);
    return (
    <Fragment>
        <AllUsersTable users= {props.users}/>
    </Fragment>
    );
}
const mapStateToProps = (state: any) => {
    return {
        users:state.hr.users,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllUsers: () => dispatch(hrActions.fetchAllUsers())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HR);