import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from "./reducers";

export default createStore(rootReducer, applyMiddleware(reduxThunk, logger));
