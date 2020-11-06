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


export default function AllContractsTable(props:any) {
  const classes = useStyles();
  let rows = props.contracts;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>contractName</TableCell>
            <TableCell align="right">company</TableCell>
            <TableCell align="right">createTime</TableCell>
            <TableCell align="right">updateTime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow key={row.contractId}>
              <TableCell component="th" scope="row">
                {row.contractName}
              </TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{new Date(row.createTime).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(row.updateTime).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}