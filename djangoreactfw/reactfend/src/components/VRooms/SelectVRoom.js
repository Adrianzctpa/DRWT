import React, { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import Pagination from "../utils/Pagination"
import BGStyles from '../../../static/css/Backgrounds.module.css'
import styles from "../../../static/css/SelectVRoom.module.css"
import { Link, useNavigate } from "react-router-dom"

const SelectVRoom = () => {
    const navigate = useNavigate()
    const {vrooms, uvrooms} = useContext(GeneralContext)
    
    if (vrooms.length === 0 || uvrooms.length === 0) return null

    const handleClick = () => {
        let VroomDiv = document.getElementById("Vrooms")
        let UVroomDiv = document.getElementById("UVrooms")
        let btn = document.getElementById('vroombtn')

        if (btn.textContent === 'All Video Rooms') {
            btn.textContent = 'Your Video Rooms'
            VroomDiv.style.display = ''
            UVroomDiv.style.display = 'none'
        } else {
            btn.textContent = 'All Video Rooms'
            UVroomDiv.style.display = ''
            VroomDiv.style.display = 'none'
        }    
    }
    
    return (   
        <div className={`${BGStyles.bg_color_strongred} ${styles.container}`}>    
            
            <h1>Click in a Video Room</h1>
            <button onClick={handleClick} id="vroombtn" className={`btn btn-primary ${styles.spacing}`}>All Video Rooms</button>
            <button onClick={() => navigate('/createvroom')} className={`btn btn-primary ${styles.spacing}`}>Create</button>
            <Link to="/">GO BACK</Link>
            
            <div id="RoomsDiv" className={`${styles.RoomsDiv} ${BGStyles.bg_color_lightblack}`}>
                <div id='UVrooms' className={styles.RoomsContainer}>
                    <Pagination rooms={uvrooms} />
                </div>
            
                <div id='Vrooms' className={styles.RoomsContainer} style={{ display: 'none' }}>
                    <Pagination rooms={vrooms}/>
                </div>
            </div>
        </div>  
    )
}

export default SelectVRoom