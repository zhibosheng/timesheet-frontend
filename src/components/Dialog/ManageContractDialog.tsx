import { Fragment } from "react";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@material-ui/core";

export default function ManageContractDialog(props: any) {
    return (
        <Fragment>
            <Dialog maxWidth="lg" open={props.dialogOpen} onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Management</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Manage Contract
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contractName"
                        label="contractName"
                        defaultValue={props.contractName}
                        type="text"
                        onChange={(event) => props.setContractName(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="company"
                        label="company"
                        defaultValue={props.company}
                        type="text"
                        onChange={(event) => props.setCompany(event.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.updateContractInformation()}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}