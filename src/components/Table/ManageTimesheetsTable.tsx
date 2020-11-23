import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField } from '@material-ui/core';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function ManageTimesheetsTable(props: any) {
  const classes = useStyles();
  let rows = props.timesheets;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>userName</TableCell>
            <TableCell align="right">contractName</TableCell>
            <TableCell align="right">company</TableCell>
            <TableCell align="right">manager</TableCell>
            <TableCell align="right">timesheetDate</TableCell>
            <TableCell align="right">startTime</TableCell>
            <TableCell align="right">endTime</TableCell>
            <TableCell align="right">breakDeduction</TableCell>
            <TableCell align="right">totalHour</TableCell>
            <TableCell align="right">note</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">updateTime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.timesheetId}>
              <TableCell component="th" scope="row">
                {row.user.userName}
              </TableCell>
              <TableCell align="right">{row.contract.contractName}</TableCell>
              <TableCell align="right">{row.contract.company}</TableCell>
              <TableCell align="right">{row.contract.manager.userName}</TableCell>
              <TableCell align="right">{new Date(row.timesheetDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={row.startTime}
                      onChange={(value) => { 
                        props.changeStartTime(row.timesheetId,value); }}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </TableCell>
              <TableCell align="right">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={row.endTime}
                      onChange={(value) => { 
                        props.changeEndTime(row.timesheetId,value); }}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="outlined-required"
                  label="breakDeduction"
                  value={row.breakDeduction}
                  variant="outlined"
                  onChange={(event) => {props.changeBreakDeduction(row.timesheetId,event.target.value)}}
                />
              </TableCell>
              <TableCell align="right">
              <TextField
                  id="outlined-required"
                  label="totalHour"
                  value={row.totalHour}
                  variant="outlined"
                  onChange={(event) => {props.changeTotalHour(row.timesheetId,event.target.value)}}
                /></TableCell>
              <TableCell align="right">
              <TextField
                  id="outlined-required"
                  label="note"
                  value={row.note}
                  variant="outlined"
                  onChange={(event) => {props.changeNote(row.timesheetId,event.target.value)}}
                /></TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{new Date(row.updateTime).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}