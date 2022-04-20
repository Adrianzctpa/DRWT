import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {AuthProvider} from "./context/AuthContext"
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Router>    
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)