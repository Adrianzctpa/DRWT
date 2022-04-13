import React from 'react';
import { useNavigate } from "react-router-dom"
import styles from "../../static/css/CreateVRoom.module.css"

const Register = () => {
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await fetch("/v1/createusers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'name': e.target.name.value,
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            navigate('/login/')
        } else {
            alert('Something went wrong. Please try again.')
        }

    }
    
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
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