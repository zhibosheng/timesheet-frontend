import { useEffect, Fragment, useState } from "react";
import React from "react";
import { connect } from "react-redux";

import * as groupActions from '../../store/actions/group';
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { Severity } from "../../shared/type";
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import ManageGroupsTable from "../../components/Table/ManageGroupsTable";
import ManageGroupDialog from "../../components/Dialog/ManageGroupDialog";
import ManageUserDialog from "../../components/Dialog/ManageUserDialog";


const GroupManagement = (props: any) => {
    const [addUserName, setAddUserName] = useState("");
    const [manageGroupId, setManageGroupId] = useState(0);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState(""); 
    const [managerName, setManagerName] = useState("")
    const [groups, setGroups] = useState([])
    const [createGroupdialogOpen, setCreateGroupDialogOpen] = useState(false);
    const [groupDialogOpen, setGroupDialogOpen] = useState(false);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");
    
    useEffect(() => {
        props.fetchAllGroups();
    }, []);

    useEffect(() => {
        setGroups(props.groups);
    }, [props.groups]);


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
        props.updateGroupInformation(manageGroupId,groupName,groupDescription, managerName);
        if (props.error) {
            setSeverity("error");
            setText("update group information error");
        } else {
            setSeverity("success");
            setText("update group information success");
        }
        setSnackbarOpen(true);
        setGroupDialogOpen(false);
        props.fetchAllGroups();
    }

    const handleCreateGroupDialogClickOpen = () => {
        setCreateGroupDialogOpen(true);
    };

    const handleCreateGroupDialogClose = () => {
        setCreateGroupDialogOpen(false);
    };

    const handleGroupDialogClickOpen = (groupId:number) => {
        setManageGroupId(groupId)
        props.fetchGroupInformation(groupId);
        setGroupDialogOpen(true);          
    };


    const handleGroupDialogClose = () => {
        setGroupDialogOpen(false);
    };



    const handleUserDialogClickOpen = (groupId:number) => {
        setManageGroupId(groupId)
        props.fetchGroupUsers(groupId);
        setUserDialogOpen(true);
    };

    const handleUserDialogClose = () => {
        setUserDialogOpen(false);
    };


    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setSnackbarOpen(false);
    };

    const createGroup = () => {
        props.createGroup(groupName, groupDescription, managerName);
        if (props.error) {
            setSeverity("error");
            setText("create new group error");
        } else {
            setSeverity("success");
            setText("create new group success");
        }
        props.fetchAllGroups();
        setCreateGroupDialogOpen(false);
        setSnackbarOpen(true);
    }

    return (
        <Fragment>
            <div>
                <Button variant="contained" color="primary" onClick={handleCreateGroupDialogClickOpen}>
                    create group
                </Button>
                <ManageGroupDialog 
                    dialogOpen = {createGroupdialogOpen}
                    handleDialogClose = {handleCreateGroupDialogClose}
                    groupName = {groupName}
                    groupDescription = {groupDescription}
                    managerName = {managerName} 
                    setGroupName = {setGroupName}
                    setGroupDescription = {setGroupDescription}
                    setManagerName = {setManagerName}
                    submit = {createGroup}
                />
            </div>
            <ManageGroupsTable 
                manageGroups={groups}
                handleGroupDialogClickOpen={handleGroupDialogClickOpen} 
                handleUserDialogClickOpen={handleUserDialogClickOpen} 
            />
            <ManageGroupDialog 
                dialogOpen = {groupDialogOpen}
                handleDialogClose = {handleGroupDialogClose}
                groupName = {groupName}
                groupDescription = {groupDescription}
                managerName = {managerName} 
                setGroupName = {setGroupName}
                setGroupDescription = {setGroupDescription}
                setManagerName = {setManagerName}
                submit = {updateGroupInformation}
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
        groupId: state.group.groupId,
        groupName: state.group.groupName,
        groupDescription: state.group.groupDescription,
        manager: state.group.manager,
        users: state.group.users,
        groups: state.group.groups,
        loading: state.group.loading,
        error: state.group.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllGroups: () => dispatch(groupActions.fetchAllGroups()),
        createGroup: (groupName:string, groupDescription:string, managerName:string) => dispatch(groupActions.createGroup(groupName, groupDescription, managerName)),
        fetchGroupInformation: (groupId:number) => dispatch(groupActions.fetchGroupInformation(groupId)),
        updateGroupInformation: (groupId:number, groupName:string, groupDescription:string, managerName:string) => dispatch(groupActions.updateGroupInformation(groupId, groupName, groupDescription, managerName)),
        fetchGroupUsers: (groupId:number) => dispatch(groupActions.fetchGroupUsers(groupId)),
        addGroupUserByName: (groupId:number, userName:string) => dispatch(groupActions.addGroupUserByName(groupId, userName)),       
        deleteGroupUser: (groupId:number, userId:number) => dispatch(groupActions.deleteGroupUser(groupId, userId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupManagement);