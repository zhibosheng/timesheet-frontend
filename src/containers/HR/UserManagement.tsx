import { useEffect, Fragment } from "react";
import React from "react";
import { connect } from "react-redux";
import AllUsersTable from "../../components/Table/AllUsersTable";
import * as userActions from '../../store/actions/user';

const UserManagement = (props:any) => {
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
        users:state.user.users,
        loading: state.user.loading,
        error: state.user.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllUsers: () => dispatch(userActions.fetchAllUsers())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);