import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import {GeneralProvider} from "./context/GeneralContext"
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Router>    
            <GeneralProvider>
                <App />
            </GeneralProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)