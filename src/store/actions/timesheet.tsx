import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchTimesheetStart = () => {
    return {
        type: actionTypes.FETCH_TIMESHEET_START
    };
};


export const fetchTimesheetsSuccess = (timesheets:any) => {
    return {
        type: actionTypes.FETCH_TIMESHEETS_SUCCESS,
        timesheets: timesheets,
    };
};

export const fetchTimesheetFail = (error:any) => {
    return {
        type: actionTypes.FETCH_TIMESHEET_FAIL,
        error: error
    };
};

export const fetchTimesheetsByUserAndDate = (userNameList:Array<string>, startDate:Date, endDate: Date) => {
    return (dispatch:any) => {
        dispatch(fetchTimesheetStart());
        const url:string = "http://localhost:8080/timesheet/users";
        axios.get(url, {
            params: {
                userNameList: userNameList.join(', '),
                startDate: startDate,
                endDate: endDate
            }
        })
        .then(response => {
            dispatch(fetchTimesheetsSuccess(response.data));        
        })
        .catch(err => {
            dispatch(fetchTimesheetFail(err.message));
        });
    }
}
export const sendTimesheetEmail = (userNameList:Array<string>, email:string, startDate:Date, endDate: Date) => {
    return (dispatch:any) => {
        dispatch(fetchTimesheetStart());
        const url:string = "http://localhost:8080/timesheet/sendEmail"
        axios.get(url, {
            params: {
                email: email,
                userNameList: userNameList.join(', '),
                startDate: startDate,
                endDate: endDate
            }
        })
        .then(response => {
            dispatch(fetchTimesheetsSuccess(response.data));        
        })
        .catch(err => {
            dispatch(fetchTimesheetFail(err.message));
        });
    }
}

