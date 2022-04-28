import React, { useContext } from 'react';
import GeneralContext from '../context/GeneralContext';
import styles from "../../static/css/CreateVRoom.module.css"

const Register = () => {
    
    const {register} = useContext(GeneralContext)

    return (
        <>
            <form onSubmit={register} className={styles.form}>
                <label>username</label>
                <input type="username" name="username" />

                <label>name</label>
                <input type="username" name="name" />

                <label>email</label>
                <input type="email" name="email" />

                <label>password</label>
                <input type="password" name="password" />

                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;