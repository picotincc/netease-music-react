import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import rootReducer from "./reducers/reducers";



let store = createStore(rootReducer);

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
