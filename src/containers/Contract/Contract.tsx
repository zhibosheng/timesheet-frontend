import React, { useState, useEffect, useMemo, useLayoutEffect, Fragment } from 'react';
import JoinContractsTable from '../../components/Table/JoinContractsTable';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/user';
import * as contractActions from '../../store/actions/contract';
import { RootState, Severity } from '../../shared/type';
import ManageContractsTable from '../../components/Table/ManageContractsTable';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from '@material-ui/core';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import ManageGroupUsersTable from '../../components/Table/ManageGroupUsersTable';

const Contract = (props:any) => {
    const [userId, setUserId] = useState(props.userId);
    const [addUserName, setAddUserName] = useState("");
    const [manageContractId, setManageContractId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");

    useEffect(() => {
        props.fetchUserManageContractsById(userId);
        props.fetchUserJoinContractsById(userId);
    },[]);

    const addContractUserByName = (addUserName:string) => {
        props.addContractUserByName(manageContractId, addUserName);
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
        props.deleteContractUser(manageContractId, userId);
        if (props.error) {
            setSeverity("error");
            setText("delete user error");
        } else {
            setSeverity("success");
            setText("delete user success");
        }
        setSnackbarOpen(true);
    };


    const handleDialogClickOpen = (contractId:number) => {
        setManageContractId(contractId)
        props.fetchContractUsers(contractId);
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
            <ManageContractsTable manageContracts= {props.manageContracts} handleDialogClickOpen={handleDialogClickOpen}/>
            <Dialog maxWidth="lg" open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Management</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Manage Contract users
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
                    <Button variant="contained" color="secondary" onClick={() => addContractUserByName(addUserName)}>
                        Add User
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <JoinContractsTable joinContracts= {props.joinContracts}/>
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
        users: state.contract.users,
        manageContracts: state.user.manageContracts,
        joinContracts: state.user.joinContracts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserManageContractsById: (userId:number) => dispatch(userActions.fetchUserManageContractsById(userId)),
        fetchUserJoinContractsById: (userId:number) => dispatch(userActions.fetchUserJoinContractsById(userId)),
        fetchContractUsers: (contractId:number) => dispatch(contractActions.fetchContractUsers(contractId)),
        addContractUserByName: (contractId:number, userName:string) => dispatch(contractActions.addContractUserByName(contractId, userName)),       
        deleteContractUser: (contractId:number, userId:number) => dispatch(contractActions.deleteContractUser(contractId, userId)),
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