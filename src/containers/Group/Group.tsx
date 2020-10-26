import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/user';
import ManageGroupsTable from '../../components/Table/ManageGroupsTable';
import JoinGroupsTable from '../../components/Table/JoinGroupsTable';
import { Divider } from '@material-ui/core';

const Group = (props: any) => {
    const [userId, setUserId] = useState(props.userId);
    useEffect(() => {
        props.fetchUserManageGroupsById(userId);
        props.fetchUserJoinGroupsById(userId);
    },[]);

    return (
        <Fragment>
            <ManageGroupsTable manageGroups={props.manageGroups} />
            <Divider />
            <Divider />
            <JoinGroupsTable joinGroups={props.joinGroups} />
        </Fragment>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userId: state.user.userId,
        manageGroups: state.user.manageGroups,
        joinGroups: state.user.joinGroups,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserManageGroupsById: (userId: number) => dispatch(actions.fetchUserManageGroupsById(userId)),
        fetchUserJoinGroupsById: (userId: number) => dispatch(actions.fetchUserJoinGroupsById(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);