import React, {useContext} from "react";
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"

const Login = () => {
    const {loading, login, logout} = useContext(AuthContext)

    return (
        <div>
            { loading ?
                <>
                    <h1>Login</h1>
                    <form onSubmit={login}>
                        <label>username</label>
                        <input type="username" name="username" />

                        <label>password</label>
                        <input type="password" name="password" />

                        <button type="submit">Login</button>
                    </form>
                    <Link to='/register'>Don't have an account?</Link>
                    <Link to="/">GO BACK</Link>
                </> : (
                <>
                    <h1>Logout</h1>
                    <button onClick={logout}>Logout</button>
                    <Link to="/">GO BACK</Link>
                </>
                )
            }
        </div>  
    )
}

export default Login;