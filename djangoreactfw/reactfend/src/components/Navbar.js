import React from 'react';
import { Link } from "react-router-dom"
import '../../static/css/bootstrap.min.css'

const Navbar = ({log}) => {

    return (
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div class='container-fluid'>
                <Link class="navbar-brand" to='/'>DRWT</Link>
                
                {log ? 
                    <>                       
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <Link class='nav-link' to='/'>Home</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class='nav-link' to='/selectvroom/'>Browse video rooms</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class='nav-link' to='/createvroom/'>Create video room</Link>
                                </li>
                            </ul>
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <Link class='nav-link' to='/login/'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </>    
                : (
                    null
                )}    
            </div>
        </nav>
    )
}

export default Navbar; 