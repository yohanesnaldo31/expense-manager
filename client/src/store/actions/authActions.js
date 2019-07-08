import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthtoken';
import * as actionTypes  from './types';

//register
export const registerUser = (userData, history) => (dispatch) => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
}

//login - get user token
export const loginUser = (userData) => (dispatch) => {
    axios.post('api/users/login', userData)
        .then(res => {
            //set token to local storage
            localStorage.setItem('jwtToken', token);
            // set token to auth header
            setAuthToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// log out
export const logoutUser = () => (dispatch) => {
    // remove token from local storage
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    // set current user to empty object
    dispatch(setCurrentUser({}));
}
