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
    const [managerName, setManagerName] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(
        new Date('2020-08-01T21:11:54'),
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date('2020-10-20T21:11:54'),
    );
    const [manageContracts, setManageContracts] = useState([]); 
    const [contractDialogOpen, setContractDialogOpen] = useState(false);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");
    
    useEffect(() => {
        props.fetchUserManageContractsById(userId);
        props.fetchUserJoinContractsById(userId);
    },[]);

    useEffect(() => {
        setContractName(props.contractName);
    },[props.contractName]);

    useEffect(() => {
        setCompany(props.company);
    },[props.company]);

    useEffect(() => {
        if(props.manager){
            setManagerName(props.manager.userName);
        }
    },[props.manager]);

    useEffect(() => {
        setStartDate(props.startDate);
    },[props.startDate]);

    useEffect(() => {
        setEndDate(props.endDate);
    },[props.endDate]);

    useEffect(() => {
        setManageContracts(props.manageContracts);
    },[props.manageContracts]);



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


    const updateContractInformation = async () => {
        props.updateContractInformation(manageContractId, contractName, company, managerName, startDate, endDate);
        if (props.error) {
            setSeverity("error");
            setText("update contract information error");
        } else {
            setSeverity("success");
            setText("update contract information success");
        }
        await props.fetchUserManageContractsById(userId);
        setSnackbarOpen(true);
        setContractDialogOpen(false);
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
                manageContracts = {manageContracts}
                handleContractDialogClickOpen= {handleContractDialogClickOpen}  
                handleUserDialogClickOpen = {handleUserDialogClickOpen}/>
            <ManageContractDialog 
                dialogOpen = {contractDialogOpen}
                handleDialogClose = {handleContractDialogClose}
                contractName = {contractName}
                company = {company}
                managerName = {managerName}
                startDate = {startDate}
                endDate = {endDate}
                setContractName = {setContractName}
                setCompany = {setCompany}
                setManagerName = {setManagerName}
                setStartDate = {setStartDate}
                setEndDate = {setEndDate}
                submit = {updateContractInformation}
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
                open = {snackbarOpen}
                severity = {severity}
                text = {text}
                onClose = {handleSnackbarClose}
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
        manager: state.contract.manager,
        startDate: state.contract.startDate,
        endDate: state.contract.endDate,
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
        updateContractInformation: (manageContractId:number, contractName:string, company:string, managerName:string, startDate:Date, endDate: Date) => dispatch(contractActions.updateContractInformation(manageContractId, contractName, company, managerName, startDate, endDate)),
        fetchContractUsers: (contractId:number) => dispatch(contractActions.fetchContractUsers(contractId)),
        addContractUserByName: (contractId:number, userName:string) => dispatch(contractActions.addContractUserByName(contractId, userName)),       
        deleteContractUser: (contractId:number, userId:number) => dispatch(contractActions.deleteContractUser(contractId, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contract);




