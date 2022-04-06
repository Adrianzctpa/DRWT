import React from "react";
import styles from "../../static/css/Home.module.css"
import { Link } from "react-router-dom"

const Home = ({log, name}) => {
    
    return (
        <>
            <h1>Home Page!</h1>
            {
            log ? 
            <>
            <h5>Hello {name}! Pogchamp!</h5>
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