import React, { useState, useEffect, useMemo, useLayoutEffect, Fragment } from 'react';
import JoinContractsTable from '../../components/Table/JoinContractsTable';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/user';
import * as contractActions from '../../store/actions/contract';
import { RootState, Severity } from '../../shared/type';
import ManageContractsTable from '../../components/Table/ManageContractsTable';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from '@material-ui/core';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import ManageUsersTable from '../../components/Table/ManageUsersTable';
import ManageUserDialog from '../../components/Dialog/ManageUserDialog';
import ManageContractDialog from '../../components/Dialog/ManageContractDialog';

const Contract = (props:any) => {
    const [userId, setUserId] = useState(props.userId);
    const [addUserName, setAddUserName] = useState("");
    const [manageContractId, setManageContractId] = useState(0);
    const [contractName, setContractName] = useState("");
    const [company, setCompany] = useState(""); 
    const [contractDialogOpen, setContractDialogOpen] = useState(false);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
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

    const updateContractInformation = () => {
        props.updateContractInformation(manageContractId, contractName, company);
        if (props.error) {
            setSeverity("error");
            setText("update contract information error");
        } else {
            setSeverity("success");
            setText("update contract information success");
        }
        setSnackbarOpen(true);
        setContractDialogOpen(false);
        props.fetchUserManageContractsById(userId);
    }

    const handleUserDialogClickOpen = (contractId:number) => {
        setManageContractId(contractId)
        props.fetchContractUsers(contractId);
        setUserDialogOpen(true);
    };


    const handleUserDialogClose = () => {
        setUserDialogOpen(false);
    };

    const handleContractDialogClickOpen = (contractId:number) => {
        setManageContractId(contractId)
        props.fetchContractInformation(contractId);
        setContractDialogOpen(true);
    };

    const handleContractDialogClose = () => {
        setContractDialogOpen(false);
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setSnackbarOpen(false);
    };


    return (
        <Fragment>
            <ManageContractsTable 
            manageContracts= {props.manageContracts}
            handleContractDialogClickOpen={handleContractDialogClickOpen}  
            handleUserDialogClickOpen={handleUserDialogClickOpen}/>
            <ManageContractDialog 
                dialogOpen = {contractDialogOpen}
                handleDialogClose = {handleContractDialogClose}
                contractName = {props.contractName}
                company = {props.company}
                setContractName = {setContractName}
                setCompany = {setCompany}
                updateContractInformation = {updateContractInformation}
            />
            <ManageUserDialog 
                dialogOpen = {userDialogOpen}
                handleDialogClose = {handleUserDialogClose}
                users = {props.users}
                deleteUser = {deleteUser}
                addUserName = {addUserName}
                setAddUserName = {setAddUserName}
                addUserByName = {addContractUserByName}
            />
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
        contractId: state.contract.contractId,
        contractName: state.contract.contractName,
        company: state.contract.company,
        users: state.contract.users,
        manageContracts: state.user.manageContracts,
        joinContracts: state.user.joinContracts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUserManageContractsById: (userId:number) => dispatch(userActions.fetchUserManageContractsById(userId)),
        fetchUserJoinContractsById: (userId:number) => dispatch(userActions.fetchUserJoinContractsById(userId)),
        fetchContractInformation: (contractId:number) => dispatch(contractActions.fetchContractInformation(contractId)),
        updateContractInformation: (manageContractId:number, contractName:string, company:string) => dispatch(contractActions.updateContractInformation(manageContractId, contractName, company)),
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