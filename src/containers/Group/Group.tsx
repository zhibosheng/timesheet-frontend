import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/user';
import * as groupActions from '../../store/actions/group';
import ManageGroupsTable from '../../components/Table/ManageGroupsTable';
import JoinGroupsTable from '../../components/Table/JoinGroupsTable';
import { Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, TableContainer, Paper, TableHead, TableRow, TableCell, Table } from '@material-ui/core';
import ManageGroupUsersTable from '../../components/Table/ManageGroupUsersTable';
import { Severity } from '../../shared/type';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';

const Group = (props: any) => {
    const [userId, setUserId] = useState(props.userId);
    const [addUserName, setAddUserName] = useState("");
    const [manageGroupId, setManageGroupId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");
    
    useEffect(() => {
        props.fetchUserManageGroupsById(userId);
        props.fetchUserJoinGroupsById(userId);
    }, []);
    
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

    const handleDialogClickOpen = (groupId:number) => {
        setManageGroupId(groupId)
        props.fetchGroupUsers(groupId);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setSnackbarOpen(false);
    };

    return (
        <Fragment>
            <ManageGroupsTable manageGroups={props.manageGroups} handleDialogClickOpen={handleDialogClickOpen} />
            <Dialog maxWidth="lg" open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Management</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Manage group users
                    </DialogContentText>
                    <ManageGroupUsersTable users = {props.users} deleteUser = {deleteUser}/>
                    <DialogContentText>
                        Add users
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="addUserName"
                        label="addUserName"
                        defaultValue={addUserName}
                        type="text"
                        onChange={(event) => setAddUserName(event.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={() => addGroupUserByName(addUserName)}>
                        Add User
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
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
        users: state.group.users,
        manageGroups: state.user.manageGroups,
        joinGroups: state.user.joinGroups,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserManageGroupsById: (userId: number) => dispatch(userActions.fetchUserManageGroupsById(userId)),
        fetchUserJoinGroupsById: (userId: number) => dispatch(userActions.fetchUserJoinGroupsById(userId)),
        fetchGroupUsers: (groupId:number) => dispatch(groupActions.fetchGroupUsers(groupId)),
        addGroupUserByName: (groupId:number, userName:string) => dispatch(groupActions.addGroupUserByName(groupId, userName)),       
        deleteGroupUser: (groupId:number, userId:number) => dispatch(groupActions.deleteGroupUser(groupId, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);