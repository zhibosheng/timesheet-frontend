import { Fragment } from "react";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@material-ui/core";

export default function ManageGroupDialog(props: any) {
    return (
        <Fragment>
            <Dialog maxWidth="lg" open={props.dialogOpen} onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Management</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Manage Group
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupName"
                        label="groupName"
                        value={props.groupName}
                        type="text"
                        onChange={(event) => props.setGroupName(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupDescription"
                        label="groupDescription"
                        value={props.groupDescription}
                        type="text"
                        onChange={(event) => props.setGroupDescription(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="managerName"
                        label="managerName"
                        value={props.managerName}
                        type="text"
                        onChange={(event) => props.setManagerName(event.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.submit()}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
