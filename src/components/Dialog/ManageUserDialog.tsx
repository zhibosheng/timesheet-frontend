import { Fragment } from "react";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@material-ui/core";
import ManageUsersTable from "../Table/ManageUsersTable";

export default function ManageUserDialog(props: any) {
    return (
        <Fragment>
            <Dialog maxWidth="lg" open={props.dialogOpen} onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Management</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Manage users
                    </DialogContentText>
                    <ManageUsersTable users={props.users} deleteUser={props.deleteUser} />
                    <DialogContentText>
                        Add users
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="addUserName"
                        label="addUserName"
                        defaultValue={props.addUserName}
                        type="text"
                        onChange={(event) => props.setAddUserName(event.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={() => props.addUserByName(props.addUserName)}>
                        Add User
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}