import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'


import App from './containers/App';
import rootReducer from "./reducers/reducers";

const loggerMiddleware = createLogger();


let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

let rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);


// function run()
// {
//     const userId = ServiceClient.getInstance().login();
//     render(
//         <App userId={userId}/>,
//         document.getElementById('root')
//     );
// }
//
// run();
