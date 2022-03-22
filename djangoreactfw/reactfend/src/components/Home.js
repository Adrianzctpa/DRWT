import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Home = ({log}) => {
    
    return (
        <div>
            <h1>Home Page!</h1>
            {
            log ? 
            <h5>Ur authenticated! Pogchamp</h5> : (
            <Link to="login">LOGIN</Link> )
            }
        </div>
    )
}

export default Home;