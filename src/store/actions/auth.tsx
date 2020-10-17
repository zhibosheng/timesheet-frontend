import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const auth = (userName: string, password: string) => {
    console.log(userName, password  );
    return (dispatch: any) => {
        dispatch(authStart());
    }
}
