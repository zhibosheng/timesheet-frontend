import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function AllTimesheetsTable(props:any) {
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
          {rows.map((row:any) => (
            <TableRow key={row.timesheetId}>
              <TableCell component="th" scope="row">
                {row.user.userName}
              </TableCell>
              <TableCell align="right">{row.contract.contractName}</TableCell>
              <TableCell align="right">{row.contract.company}</TableCell>
              <TableCell align="right">{row.contract.manager.userName}</TableCell>
              <TableCell align="right">{new Date(row.timesheetDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(row.startTime).getHours()+":"+new Date(row.startTime).getMinutes()}</TableCell>
              <TableCell align="right">{new Date(row.endTime).getHours()+":"+new Date(row.endTime).getMinutes()}</TableCell>
              <TableCell align="right">{row.breakDeduction}</TableCell>
              <TableCell align="right">{row.totalHour}</TableCell>
              <TableCell align="right">{row.note}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{new Date(row.updateTime).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}