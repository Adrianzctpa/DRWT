import React, {useContext} from "react";
import CVRstyles from '../../static/css/CreateVRoom.module.css' 
import styles from '../../static/css/Login.module.css' 
import GeneralContext from "../context/GeneralContext"
import { Link } from "react-router-dom"

const Login = () => {
    const {logstatus, login, logout} = useContext(GeneralContext)

    return (
        <div className={styles.bg_color_strongred}>
            { !logstatus ?
                <div className={`${CVRstyles.form} ${styles.bg_color_lightblack}`}>
                    <h1>Login</h1>
                    <form onSubmit={login}>

                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="username" class="form-control" id="username" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" />
                            <div id="passHelp" class="form-text">Don't worry, we'll never share your password.</div>
                        </div>

                        <button type="submit" class='btn btn-primary'>Login</button>
                    </form>
                    <Link to='/register'>Don't have an account?</Link>
                    <Link to="/">GO BACK</Link>
                </div> : (
                <div className={`${CVRstyles.form} ${styles.bg_color_lightblack}`}>
                    <h1>Logout</h1>
                    <button onClick={logout}>Logout</button>
                    <Link to="/">GO BACK</Link>
                </div>
                )
            }
        </div>  
    )
}

export default Login;