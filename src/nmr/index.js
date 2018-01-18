import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from './reducers/reducers'
import App from './components/App';
import ServiceClient from "./service/ServiceClientP";

const loggerMiddleware = createLogger();


let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

run();
