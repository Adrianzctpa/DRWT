import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Pagination from "../utils/Pagination"
import styles from "../../../static/css/SelectVRoom.module.css"
import { Link, useNavigate } from "react-router-dom"

const SelectVRoom = () => {
    const navigate = useNavigate()
    const {vrooms, uvrooms} = useContext(AuthContext)

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
        <>
            <div>    
                <h1>Click in a Video Room</h1>
                
                <button onClick={handleClick} id="vroombtn">All Video Rooms</button>
                <input type="text" id="inputquery" placeholder="Search..."/>
                <button onClick={() => navigate('/createvroom')}>Create</button>
                <Link to="/">GO BACK</Link>
                <div id="RoomsDiv" className={styles.RoomsDiv}>
                    <div id='UVrooms'>
                        <Pagination rooms={uvrooms} />
                    </div>
                
                    <div id='Vrooms' style={{ display: 'none' }}>
                        <Pagination rooms={vrooms}/>
                    </div>
                </div>
            </div>
        </>   
    )
}

export default SelectVRoom