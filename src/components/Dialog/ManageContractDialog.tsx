import { Fragment } from "react";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function ManageContractDialog(props: any) {

    
    //   const handleDateChange = (date: Date | null) => {
    //     setSelectedDate(date);
    //   };
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="startDate"
                                label="Date picker inline"
                                value={props.startDate}
                                onChange={props.setStartDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="endDate"
                                label="Date picker inline"
                                value={props.endDate}
                                onChange={props.setEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
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