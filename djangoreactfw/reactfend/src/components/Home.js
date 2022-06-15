import React, {useContext, useEffect, useRef} from "react";
import GeneralContext from "../context/GeneralContext";
import "../../static/css/bootstrap.min.css"
import styles from "../../static/css/Home.module.css"
import { Link } from "react-router-dom"

const Home = () => {
    
    const {logstatus, username} = useContext(GeneralContext)

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <h1>Watch videos, with people you care about.</h1>
                    <img className={styles.img} src="../../static/svg/play-button.svg" />         
                </div>
            </div>

            <div className={styles.right}>   
                <div className={styles.top}>
                    <h1>A Watch Together web-app, made specially for you!</h1>
                    {!logstatus ? 
                    <div>
                        <h5>To enjoy this web-app, you need to log in. </h5>

                        <div className={styles.links}>
                            <Link className={styles.a} to='login'><button style={{color: '#242428'}} type="button" class="btn btn-danger">Log in</button></Link>
                        </div>      
                    </div> : (
                    <div>
                        <h5>Hello again {username}!</h5> 
                        <h5>Or is it the first time?</h5>
                        <h5>
                            Anyway, check the links below to start watching!
                        </h5>
                        
                        <div className={styles.links}>
                            <Link className={styles.a} to='selectvroom'><button style={{color: '#242428'}} type="button" class="btn btn-danger">Browse video rooms</button></Link>
                            <Link className={styles.a} to='createvroom'><button style={{color: '#242428'}} type="button" class="btn btn-secondary">Create video room</button></Link>
                        </div>
                    </div>
                    )}
                </div>  
            </div>  
        </div>    
    )
}

export default Home;