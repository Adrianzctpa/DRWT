import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import styles from "../../static/css/Home.module.css"
import { Link } from "react-router-dom"

const Home = () => {
    
    const {logstatus, username} = useContext(AuthContext)

    return (
        <>
            <h1>Home Page!</h1>
            {
                logstatus ? 
                <>
                <h5>Hello {username}! Pogchamp!</h5>
                <Link className={styles.a}to="login">LOGOUT</Link>
                <Link className={styles.a}to="selectvroom">SelectVRoom</Link>
                <Link className={styles.a}to="createvroom">CreateVRoom</Link>
                </>
                : (
                <Link className={styles.a}to="login">LOGIN</Link> )
            } 
        </>    
    )
}

export default Home;


