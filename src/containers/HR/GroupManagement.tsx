import { useEffect, Fragment, useState } from "react";
import React from "react";
import { connect } from "react-redux";

import * as groupActions from '../../store/actions/group';
import AllGroupsTable from "../../components/Table/AllGroupsTable";
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { Severity } from "../../shared/type";
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';


const GroupManagement = (props: any) => {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState(""); 
    const [managerName, setManagerName] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");
    
    useEffect(() => {
        props.fetchAllGroups();
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
        props.createGroup(groupName, groupDescription, managerName);
        if (props.error) {
            setSeverity("error");
            setText("create new group error");
        } else {
            setSeverity("success");
            setText("create new group success");
        }
        props.fetchAllGroups();
        setDialogOpen(false);
        setSnackbarOpen(true);
    }

    return (
        <Fragment>
            <div>
                <Button variant="contained" color="primary" onClick={handleDialogClickOpen}>
                    create group
                </Button>
                <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">create new group</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="groupName"
                            label="groupName"
                            defaultValue={groupName}
                            type="text"
                            fullWidth
                            onChange={(event) => setGroupName(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="groupDescription"
                            label="groupDescription"
                            defaultValue={groupDescription}
                            type="text"
                            fullWidth
                            onChange={(event) => setGroupDescription(event.target.value)}
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
            <AllGroupsTable groups={props.groups} />
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
        groups: state.group.groups,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAllGroups: () => dispatch(groupActions.fetchAllGroups()),
        createGroup: (groupName:string, groupDescription:string, managerName:string) => dispatch(groupActions.createGroup(groupName, groupDescription, managerName))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupManagement);