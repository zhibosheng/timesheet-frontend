import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/user';
import { Severity } from '../../shared/type';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';

const ChangePassword = (props: any) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("")

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
        props.updateUserPassword(props.userId, oldPassword, newPassword);
        if (props.error) {
            setSeverity("error");
            setText("change password error");
        } else {
            setSeverity("success");
            setText("change password success");
        }
        setDialogOpen(false);
        setSnackbarOpen(true);
    }

    return (
        <Fragment>
            <div>
                <Button variant="contained" color="primary" onClick={handleDialogClickOpen}>
                    change password
                </Button>
                <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To change your password, please enter your previous password here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="oldPassword"
                            label="oldPassword"
                            defaultValue={oldPassword}
                            type="password"
                            fullWidth
                            onChange={(event) => setOldPassword(event.target.value)}
                        />
                        <DialogContentText>
                            please enter your new password here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newPassword"
                            label="newPassword"
                            defaultValue={newPassword}
                            type="password"
                            fullWidth
                            onChange={(event) => setNewPassword(event.target.value)}
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
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        password: state.user.password,
        email: state.user.email,
        phone: state.user.phone,
        avatarUrl: state.user.avatarUrl,
        avatar: state.user.avatar,
        createTime: state.user.createTime,
        updateTime: state.user.updateTime,
        loading: state.user.loading,
        error: state.user.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateUserPassword: (userId: number, oldPassword: string, newPassword: string) => dispatch(actions.updateUserPassword(userId, oldPassword, newPassword))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);