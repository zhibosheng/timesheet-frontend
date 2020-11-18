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
import CustomizedSnackbars from "../../components/Snackbars/CustomizedSnackbar";
import { Severity } from "../../shared/type";
import * as timesheetActions from '../../store/actions/timesheet';
import AllTimesheetsTable from "../../components/Table/AllTimesheetsTable";

const TimesheetManagement = (props: any) => {
    const [addUserName, setAddUserName] = useState("");
    const [userNameList, setUserNameList] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(
        new Date('2020-08-01T21:11:54'),
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date('2020-10-20T21:11:54'),
    );
    const [email, setEmail] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");

    const fetchTimesheetsByUserAndDate = () => {
        props.fetchTimesheetsByUserAndDate(userNameList,startDate,endDate)
        if (props.error) {
            setSeverity("error");
            setText("fetch user timesheets error");
        } else {
            setSeverity("success");
            setText("fetch user timesheets success");
        }
        setSnackbarOpen(true);
    }

    const sendTimesheetEmail = () => {
        props.sendTimesheetEmail(userNameList, email, startDate, endDate)
        if (props.error) {
            setSeverity("error");
            setText("fetch user timesheets error");
        } else {
            setSeverity("success");
            setText("fetch user timesheets success");
        }
        setSnackbarOpen(true);

    }

    const addUserByName = (addUserName:string) => {
        if(!userNameList.includes(addUserName)){
            userNameList.push(addUserName);  
        }
        if (props.error) {
            setSeverity("error");
            setText("add user error");
        } else {
            setSeverity("success");
            setText("add user success");
        }
        setSnackbarOpen(true);
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setSnackbarOpen(false);
    };

    return (
        <Fragment>
            {userNameList.map((userName:any) => (
               <p>{userName}</p> 
            ))}
            <div style={{textAlign:"center"}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="addUserName"
                    label="addUserName"
                    value={addUserName}
                    type="text"
                    variant="outlined"
                    onChange={(event) => setAddUserName(event.target.value)}
                />
                <Button style={{marginLeft:"30px"}} variant="contained" color="secondary" onClick={() => addUserByName(addUserName)}>
                    Add User
                </Button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="startDate"
                        label="Date picker inline"
                        value={startDate}
                        onChange={setStartDate}
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
                        value={endDate}
                        onChange={setEndDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <div style={{textAlign:"center"}}>
                <Button variant="contained" color="primary" onClick={fetchTimesheetsByUserAndDate} >
                    show Timesheet
                </Button>
            </div>
            <div style={{textAlign:"center"}}>
                <p><TextField
                    required
                    id="outlined-required"
                    label="email"
                    value={email}
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Button style={{marginLeft:"30px"}} variant="contained" color="primary" onClick={sendTimesheetEmail} >
                    send email
                </Button></p>
            </div>
            <AllTimesheetsTable timesheets= {props.timesheets}/>
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
        timesheets : state.timesheet.timesheets,
        loading: state.timesheet.loading,
        error: state.timesheet.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchTimesheetsByUserAndDate: (userNameList:Array<string>, startDate:Date, endDate: Date) => dispatch(timesheetActions.fetchTimesheetsByUserAndDate(userNameList, startDate, endDate)),
        sendTimesheetEmail: (userNameList:Array<string>, email:string, startDate:Date, endDate: Date) => dispatch(timesheetActions.sendTimesheetEmail(userNameList, email, startDate, endDate))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TimesheetManagement);