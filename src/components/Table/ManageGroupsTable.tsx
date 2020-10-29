import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function ManageGroupsTable(props:any) {
  const classes = useStyles();
  let rows = props.manageGroups;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>groupName</TableCell>
            <TableCell align="right">groupDescription</TableCell>
            <TableCell align="right">createTime</TableCell>
            <TableCell align="right">updateTime</TableCell>
            <TableCell align="right">editing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow key={row.groupId}>
              <TableCell component="th" scope="row">
                {row.groupName}
              </TableCell>
              <TableCell align="right">{row.groupDescription}</TableCell>
              <TableCell align="right">{new Date(row.createTime).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(row.updateTime).toLocaleDateString()}</TableCell>
              <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => props.handleDialogClickOpen(row.groupId)}>
                edit
              </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}