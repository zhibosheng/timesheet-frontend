import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";

import * as contractActions from '../../store/actions/contract';
import AllContractsTable from "../../components/Table/AllContractsTable";
import { Button, DialogTitle, Dialog, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import { Severity } from "../../shared/type";
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';


const ContractManagement = (props: any) => {
    const [contractName, setContractName] = useState("")
    const [company, setCompany] = useState("")
    const [managerName, setManagerName] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");
    
    useEffect(() => {
        props.fetchAllContracts();
    }, []);

    const handleDialogClickOpen = () => {
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

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        props.createContract(contractName, company, managerName);
        if (props.error) {
            setSeverity("error");
            setText("create new contract error");
        } else {
            setSeverity("success");
            setText("create new contract success");
        }
        props.fetchAllContracts();
        setDialogOpen(false);
        setSnackbarOpen(true);
    }

    return (
        <Fragment>
            <div>
                <Button variant="contained" color="primary" onClick={handleDialogClickOpen}>
                    create  contract
                </Button>
                <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">create new contract</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="contractName"
                            label="contractName"
                            defaultValue={contractName}
                            type="text"
                            fullWidth
                            onChange={(event) => setContractName(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="company"
                            label="company"
                            defaultValue={company}
                            type="text"
                            fullWidth
                            onChange={(event) => setCompany(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="managerName"
                            label="managerName"
                            defaultValue={managerName}
                            type="text"
                            fullWidth
                            onChange={(event) => setManagerName(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={(event) => submitHandler(event)} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <AllContractsTable contracts={props.contracts} />
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
        contracts: state.contract.contracts,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllContracts: ()  => dispatch(contractActions.fetchAllContracts()),
        createContract: (contractName:string, company:string, managerName:string) => dispatch(contractActions.createContract(contractName, company, managerName))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractManagement);