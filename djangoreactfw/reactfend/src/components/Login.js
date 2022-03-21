import React, { useEffect, useState } from "react";

const Login = () => {
    
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>email</label>
                <input type="email" name="email" />

                <label>password</label>
                <input type="password" name="password" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;