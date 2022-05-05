import 'core-js/stable';
import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

import './global.css';

const container = document.getElementById('app');

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    container,
);
