import React from "react";
import { Link, useNavigate } from "react-router-dom"

const Login = ({log}) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            navigate("/")
            window.location.reload(false)
        } else {
            alert("No account found with given credentials")
        }       
    }

    const LogOut = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        console.log("removed.")
        window.location.reload(false)
    }

    return (
        <div>
            { log ?
                <>
                    <h1>Logout</h1>
                    <button onClick={LogOut}>Logout</button>
                    <Link to="/">GO BACK</Link>
                </> : (
                <>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label>username</label>
                        <input type="username" name="username" />

                        <label>password</label>
                        <input type="password" name="password" />

                        <button type="submit">Login</button>
                    </form>
                    <Link to="/">GO BACK</Link>
                </>) 
            }
        </div>  
    )
}

export default Login;