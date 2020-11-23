import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";

import * as contractActions from '../../store/actions/contract';
import { Button, DialogTitle, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Grid } from "@material-ui/core";
import { Severity } from "../../shared/type";
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ManageContractsTable from "../../components/Table/ManageContractsTable";
import ManageContractDialog from "../../components/Dialog/ManageContractDialog";
import ManageUserDialog from "../../components/Dialog/ManageUserDialog";


const ContractManagement = (props: any) => {
    const [addUserName, setAddUserName] = useState("");
    const [contractName, setContractName] = useState("")
    const [company, setCompany] = useState("")
    const [manageContractId, setManageContractId] = useState(0);
    const [managerName, setManagerName] = useState("")
    const [startDate, setStartDate] = useState<Date | null>(
        new Date('2020-08-01T21:11:54'),
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date('2020-10-20T21:11:54'),
    );
    const [contractDialogOpen, setContractDialogOpen] = useState(false);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [createContractDialogOpen, setCreateContractDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");

    useEffect(() => {
        props.fetchAllContracts();
    }, []);

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
        props.updateContractInformation(manageContractId, contractName, company, managerName, startDate, endDate);
        if (props.error) {
            setSeverity("error");
            setText("update contract information error");
        } else {
            setSeverity("success");
            setText("update contract information success");
        }
        setSnackbarOpen(true);
        setContractDialogOpen(false);
        props.fetchAllContracts();
    }


    const handleCreateContractDialogClickOpen = () => {
        setCreateContractDialogOpen(true);
    };

    const handleCreateContractDialogClose = () => {
        setCreateContractDialogOpen(false);
    };

    const handleContractDialogClickOpen = (contractId:number) => {
        setManageContractId(contractId)
        props.fetchContractInformation(contractId);
        setContractDialogOpen(true);
    };

    const handleContractDialogClose = () => {
        setContractDialogOpen(false);
    };

    const handleUserDialogClickOpen = (contractId:number) => {
        setManageContractId(contractId)
        props.fetchContractUsers(contractId);
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

    const createContract = () => {
        props.createContract(contractName, company, managerName, startDate, endDate);
        if (props.error) {
            setSeverity("error");
            setText("create new contract error");
        } else {
            setSeverity("success");
            setText("create new contract success");
        }
        props.fetchAllContracts();
        setCreateContractDialogOpen(false);
        setSnackbarOpen(true);
    }

    return (
        <Fragment>
            <div>
                <Button variant="contained" color="primary" onClick={handleCreateContractDialogClickOpen}>
                    create  contract
                </Button>
                <ManageContractDialog 
                    dialogOpen = {createContractDialogOpen}
                    handleDialogClose = {handleCreateContractDialogClose}
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
                    submit = {createContract}
                />
            </div>
            <ManageContractsTable 
                manageContracts = {props.contracts}
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
        contractId: state.contract.contractId,
        contractName: state.contract.contractName,
        company: state.contract.company,
        manager: state.contract.manager,
        startDate: state.contract.startDate,
        endDate: state.contract.endDate,
        users: state.contract.users,
        contracts: state.contract.contracts,
        loading: state.contract.loading,
        error: state.contract.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllContracts: () => dispatch(contractActions.fetchAllContracts()),
        createContract: (contractName: string, company: string, managerName: string, startDate:Date, endDate:Date) => dispatch(contractActions.createContract(contractName, company, managerName, startDate, endDate)),
        fetchContractInformation: (contractId:number) => dispatch(contractActions.fetchContractInformation(contractId)),
        updateContractInformation: (manageContractId:number, contractName:string, company:string, managerName:string, startDate:Date, endDate: Date) => dispatch(contractActions.updateContractInformation(manageContractId, contractName, company, managerName, startDate, endDate)),
        fetchContractUsers: (contractId:number) => dispatch(contractActions.fetchContractUsers(contractId)),
        addContractUserByName: (contractId:number, userName:string) => dispatch(contractActions.addContractUserByName(contractId, userName)),       
        deleteContractUser: (contractId:number, userId:number) => dispatch(contractActions.deleteContractUser(contractId, userId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractManagement);
