import React, { useContext } from 'react';
import GeneralContext from '../context/GeneralContext';
import formStyles from '../../static/css/Form.module.css' 
import styles from '../../static/css/Backgrounds.module.css'

const Register = () => {
    
    const {register} = useContext(GeneralContext)

    return (
        <div className={styles.bg_color_strongred}>
            <div className={`${formStyles.form} ${styles.bg_color_lightblack}`}>
                <h1>Register</h1>
                <form onSubmit={register}>

                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input type="username" class="form-control" id="username" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="name" class="form-control" id="name" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" />
                    </div>

                    <button type="submit" class='btn btn-primary'>Register</button>
                </form>
            </div>            
        </div>      
    )
}

export default Register;