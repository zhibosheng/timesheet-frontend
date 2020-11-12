import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/user';
import * as groupActions from '../../store/actions/group';
import ManageGroupsTable from '../../components/Table/ManageGroupsTable';
import JoinGroupsTable from '../../components/Table/JoinGroupsTable';
import { Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, TableContainer, Paper, TableHead, TableRow, TableCell, Table } from '@material-ui/core';
import ManageUsersTable from '../../components/Table/ManageUsersTable';
import { Severity } from '../../shared/type';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import ManageUserDialog from '../../components/Dialog/ManageUserDialog';
import ManageGroupDialog from '../../components/Dialog/ManageGroupDialog';

const Group = (props: any) => {
    const [userId, setUserId] = useState(props.userId);
    const [addUserName, setAddUserName] = useState("");
    const [manageGroupId, setManageGroupId] = useState(0);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState(""); 
    const [managerName, setManagerName] = useState("");
    const [groupDialogOpen, setGroupDialogOpen] = useState(false);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");
    
    useEffect(() => {
        props.fetchUserManageGroupsById(userId);
        props.fetchUserJoinGroupsById(userId);
    }, []);

    useEffect(() => {
        setGroupName(props.groupName);
    },[props.groupName]);

    useEffect(() => {
        setGroupDescription(props.groupDescription);
    },[props.groupDescription]);

    useEffect(() => {
        if(props.manager){
            setManagerName(props.manager.userName);
        }
    },[props.manager]);
    
    const addGroupUserByName = (addUserName:string) => {
        props.addGroupUserByName(manageGroupId,addUserName);
        if (props.error) {
            setSeverity("error");
            setText("add user error");
        } else {
            setSeverity("success");
            setText("add user success");
        }
        setSnackbarOpen(true);
    }

    const deleteUser = (userId: number) => {
        props.deleteGroupUser(manageGroupId,userId);
        if (props.error) {
            setSeverity("error");
            setText("delete user error");
        } else {
            setSeverity("success");
            setText("delete user success");
        }
        setSnackbarOpen(true);
    };

    const updateGroupInformation = () => {
        props.updateGroupInformation(manageGroupId,groupName,groupDescription,managerName);
        if (props.error) {
            setSeverity("error");
            setText("update group information error");
        } else {
            setSeverity("success");
            setText("update group information success");
        }
        setSnackbarOpen(true);
        setGroupDialogOpen(false);
        props.fetchUserManageGroupsById(userId);
    }

    const handleUserDialogClickOpen = (groupId:number) => {
        setManageGroupId(groupId)
        props.fetchGroupUsers(groupId);
        setUserDialogOpen(true);
    };

    const handleUserDialogClose = () => {
        setUserDialogOpen(false);
    };

    const handleGroupDialogClickOpen = (groupId:number) => {
        setManageGroupId(groupId)
        props.fetchGroupInformation(groupId);
        setGroupDialogOpen(true);
    };


    const handleGroupDialogClose = () => {
        setGroupDialogOpen(false);
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setSnackbarOpen(false);
    };

    return (
        <Fragment>
            <ManageGroupsTable 
                manageGroups={props.manageGroups}
                handleGroupDialogClickOpen={handleGroupDialogClickOpen} 
                handleUserDialogClickOpen={handleUserDialogClickOpen} />
            <ManageGroupDialog 
                dialogOpen = {groupDialogOpen}
                handleDialogClose = {handleGroupDialogClose}
                groupName = {groupName}
                groupDescription = {groupDescription}
                managerName = {managerName} 
                setGroupName = {setGroupName}
                setGroupDescription = {setGroupDescription}
                setManagerName = {setManagerName}
                updateGroupInformation = {updateGroupInformation}
            />
            <ManageUserDialog 
                dialogOpen = {userDialogOpen}
                handleDialogClose = {handleUserDialogClose}
                users = {props.users}
                deleteUser = {deleteUser}
                addUserName = {addUserName}
                setAddUserName = {setAddUserName}
                addUserByName = {addGroupUserByName}
            />
            <Divider />
            <JoinGroupsTable joinGroups={props.joinGroups} />
            <CustomizedSnackbars
                open={snackbarOpen}
                severity={severity}
                text={text}
                onClose={handleSnackbarClose}
            />
        </Fragment>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userId: state.user.userId,
        groupId: state.group.groupId,
        groupName: state.group.groupName,
        groupDescription: state.group.groupDescription,
        manager: state.group.manager,
        users: state.group.users,
        manageGroups: state.user.manageGroups,
        joinGroups: state.user.joinGroups,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserManageGroupsById: (userId: number) => dispatch(userActions.fetchUserManageGroupsById(userId)),
        fetchUserJoinGroupsById: (userId: number) => dispatch(userActions.fetchUserJoinGroupsById(userId)),
        fetchGroupInformation: (groupId:number) => dispatch(groupActions.fetchGroupInformation(groupId)),
        updateGroupInformation: (groupId:number, groupName:string, groupDescription:string, managerName:string) => dispatch(groupActions.updateGroupInformation(groupId, groupName, groupDescription, managerName)),
        fetchGroupUsers: (groupId:number) => dispatch(groupActions.fetchGroupUsers(groupId)),
        addGroupUserByName: (groupId:number, userName:string) => dispatch(groupActions.addGroupUserByName(groupId, userName)),       
        deleteGroupUser: (groupId:number, userId:number) => dispatch(groupActions.deleteGroupUser(groupId, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);