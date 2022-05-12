import React, {useContext, useEffect, useRef} from "react";
import GeneralContext from "../context/GeneralContext";
import "../../static/css/bootstrap.min.css"
import styles from "../../static/css/Home.module.css"
import { Link } from "react-router-dom"

const Home = () => {
    
    const {loading, username} = useContext(GeneralContext)

    return (
        <>
            <h1>Home Page!</h1>

            {
                loading ? 
                    <>
                        <Link className={styles.a}to="login">LOGIN</Link> 
                    </> : (
                    <div>
                        { localStorage.getItem('firstlogin') === 'true' ?
                            <div className={`alert alert-success alert-dismissible fade show ${styles.center}`} role="alert">
                                Hello {username}!
                                <button onClick={() => localStorage.removeItem('firstlogin')} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                            </div>
                        : (null)}    

                        <div>
                            <h5>Hello {username}! Pogchamp!</h5>
                            <Link className={styles.a}to="login">LOGOUT</Link>
                            <Link className={styles.a}to="selectvroom">SelectVRoom</Link>
                            <Link className={styles.a}to="createvroom">CreateVRoom</Link>
                        </div>
                    </div>
                )
            } 
        </>    
    )
}

export default Home;