import { combineReducers } from 'redux';

import authReducer from './authReducers';
import errorReducer from './errorReducers';

const combinedReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer
});

export default combinedReducer;