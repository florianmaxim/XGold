import {applyMiddleware, createStore} from "redux";

import {createLogger}                 from "redux-logger"
import thunk                          from "redux-thunk"

import reducer from "./reducers";

import * as config from '../../config.json';

let middleware;

const logger = createLogger({
    collapsed: false
});

if(config.logActions){
    middleware = applyMiddleware(thunk, logger)
}else{
    middleware = applyMiddleware(thunk)
}

export default createStore(reducer, middleware);