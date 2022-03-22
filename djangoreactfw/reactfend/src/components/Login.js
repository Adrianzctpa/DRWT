import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Login = () => {
    
    const handleSubmit = async (e) => {
        
        let response = await fetch("/v1/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        })
        
        let data = await response.json()
        if (response.status === 200) {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            console.log("made tokens!")
        } else {
            console.log("oporra" + JSON.stringify(data))
        }       
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>username</label>
                <input type="username" name="username" />

                <label>password</label>
                <input type="password" name="password" />

                <button type="submit">Login</button>
            </form>
            <Link to="/">GO BACK</Link>
        </div>  
    )
}

export default Login;