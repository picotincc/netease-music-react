import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import ServiceClient from "./service/ServiceClient";



async function run()
{
    const userId = await ServiceClient.getInstance().login();
    render(
        <App userId={userId}/>,
        document.getElementById('root')
    );
}

run();
