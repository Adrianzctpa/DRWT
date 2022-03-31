import React from "react";
import { Link } from "react-router-dom"

const Home = ({log, name}) => {
    
    return (
        <>
            <h1>Home Page!</h1>
            {
            log ? 
            <>
            <h5>Hello {name}! Pogchamp!</h5>
            <Link to="login">LOGOUT</Link>
            <Link to="selectvroom">SelectVRoom</Link>
            <Link to="createvroom">CreateVRoom</Link>
            </>
            : (
            <Link to="login">LOGIN</Link> )
            }
        </>
    )
}

export default Home;