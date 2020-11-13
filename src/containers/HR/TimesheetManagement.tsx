import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const TimesheetManagement = (props: any) => {
    const [email, setEmail] = useState("");

    return (
        <Fragment>
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
                    <Button variant="contained" color="primary" >
                    show Timesheet
                    </Button>
                </Grid>
            </MuiPickersUtilsProvider>
            <p><TextField
                required
                id="outlined-required"
                label="email"
                defaultValue={email}
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
            />
            <Button variant="contained" color="primary" >
                send email
            </Button></p>
        </Fragment>
    );
}

const mapStateToProps = (state: any) => {
    return {

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TimesheetManagement);