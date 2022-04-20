import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext"
import styles from "../../../static/css/SelectVRoom.module.css"
import { Link, useNavigate } from "react-router-dom"

const SelectVRoom = () => {

    const {vrooms} = useContext(AuthContext)
    const navigate = useNavigate()

    const GenerateVrooms = () => {
        let RoomsDiv = document.getElementById("RoomsDiv")
        
        vrooms.forEach((e,k,a) => {
            let div = document.createElement("div")
            div.classList.add(styles.Room)
            div.onclick = () => {
                navigate(`/videoroom/${e.uuid}`)
            }
            
            let title = document.createElement("p")
            title.textContent = e.title

            let guestpause = document.createElement("h5")
            guestpause.textContent = "Guest Pause: " + e.guest_pause_permission

            let vpath = document.createElement("h5")
            vpath.textContent = "Video Path: " + e.videopath

            div.appendChild(title)
            div.appendChild(guestpause)
            div.appendChild(vpath)
            RoomsDiv.appendChild(div)
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        GenerateVrooms()
    })

    return (
        <div>
            <h1>Click in a Video Room</h1>
            
            <button onClick={handleClick}>All Video Rooms</button>
            <div id="RoomsDiv" className={styles.RoomsDiv} />
            <button>Create</button>

            <Link to="/">GO BACK</Link>
        </div>
    )
}

export default SelectVRoom;