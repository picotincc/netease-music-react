import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import ServiceClient from "./service/ServiceClientP";



function run()
{
    const userId = ServiceClient.getInstance().login();
    render(
        <App userId={userId}/>,
        document.getElementById('root')
    );
}

run();
