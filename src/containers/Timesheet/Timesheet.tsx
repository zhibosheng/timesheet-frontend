import React, { useState, useEffect, Fragment } from 'react';
import { Severity } from '../../shared/type';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import * as userActions from '../../store/actions/user';
import * as timesheetActions from '../../store/actions/timesheet';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import ManageTimesheetsTable from '../../components/Table/ManageTimesheetsTable';



const Timesheet = (props: any) => {
    const [userId, setUserId] = useState(props.userId);
    const [startDate, setStartDate] = useState<Date | null>(
        new Date('2020-08-01T21:11:54'),
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date('2020-10-20T21:11:54'),
    );

    //solve the type problem using Array<any>, 
    //to do use interface
    const [timesheets,setTimesheets] = useState<Array<any>>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");


    useEffect(() => {
        setTimesheets(props.timesheets);
    },[props.timesheets]);

    const changeStartTime = (timesheetId:number,value:string) => {
        for(var timesheet of timesheets){
            if(timesheetId === timesheet.timesheetId){
                // trigger the react rerender
                const copy = Array.from(timesheets);
                timesheet.startTime = value;
                setTimesheets(copy);
            }
        }
    }

    const changeEndTime = (timesheetId:number,value:string) => {
        for(let timesheet of timesheets){
            if(timesheetId === timesheet.timesheetId){
                const copy = Array.from(timesheets);
                timesheet.endTime = value;
                setTimesheets(copy);
            }
        }
    }

    const changeBreakDeduction = (timesheetId:number,value:string) => {
        for(let  timesheet of timesheets){
            if(timesheetId === timesheet.timesheetId){
                const copy = Array.from(timesheets);
                timesheet.breakDeduction = value;
                setTimesheets(copy);
            }
        }
    }

    const changeTotalHour = (timesheetId:number,value:string) => {
        for(let timesheet of timesheets){
            if(timesheetId === timesheet.timesheetId){
                const copy = Array.from(timesheets);
                timesheet.totalHour = value;
                setTimesheets(copy);
            }
        }
    }

    const changeNote = (timesheetId:number,value:string) => {
        for(let  timesheet of timesheets){
            if(timesheetId === timesheet.timesheetId){
                const copy = Array.from(timesheets);
                timesheet.note = value;
                setTimesheets(copy);
            }
        }
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const fetchTimesheetsByUserIdAndDate = () => {
        props.fetchTimesheetsByUserIdAndDate(userId,startDate,endDate)
        if (props.error) {
            setSeverity("error");
            setText("fetch user timesheets error");
        } else {
            setSeverity("success");
            setText("fetch user timesheets success");
        }
        setSnackbarOpen(true);
    }

    const updateTimesheets = () => {
        props.updateTimesheets(timesheets)
        if (props.error) {
            setSeverity("error");
            setText("update user timesheets error");
        } else {
            setSeverity("success");
            setText("update user timesheets success");
        }
        setSnackbarOpen(true);
    }


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
            <div style={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" onClick={fetchTimesheetsByUserIdAndDate} >
                    show Timesheet
                </Button>
            </div>
            <div style={{ textAlign: "center" }}>
                <Button variant="contained" color="secondary" onClick={updateTimesheets} >
                    update Timesheets
                </Button>
            </div>
            <ManageTimesheetsTable 
                timesheets={timesheets} 
                changeStartTime={changeStartTime}
                changeEndTime={changeEndTime}
                changeBreakDeduction={changeBreakDeduction}
                changeTotalHour={changeTotalHour}
                changeNote={changeNote}
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
        userId: state.user.userId,
        userName: state.user.userName,
        timesheets: state.user.timesheets,
        loading: state.user.loading,
        error: state.user.error,
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchTimesheetsByUserIdAndDate: (userId:number, startDate:Date, endDate: Date) => dispatch(userActions.fetchTimesheetsByUserIdAndDate(userId,startDate,endDate)),
        updateTimesheets: (timesheets:Array<any>)  => dispatch(timesheetActions.updateTimesheets(timesheets)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Timesheet);