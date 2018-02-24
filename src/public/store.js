import {applyMiddleware, createStore} from "redux";

import {createLogger}                 from "redux-logger"
import thunk                          from "redux-thunk"

import reducer from "./reducers";

import * as config from '../../config.json';

let middleware;

if(config.logActions){
    middleware = applyMiddleware(thunk, createLogger())
}else{
    middleware = applyMiddleware(thunk)
}

export default createStore(reducer, middleware);