import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

const SelectVRoom = ({vrooms}) => {

    let navigate = useNavigate();

    const GenerateVrooms = () => {
        let RoomsDiv = document.getElementById("RoomsDiv")
        
        vrooms.forEach((e,k,a) => {
            let div = document.createElement("div")
            div.classList.add("Room")
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

    useEffect(() => {
        GenerateVrooms()
    })

    return (
        <div class="SelectVRoom">
            <link rel="stylesheet" type="text/css" href="/static/css/SelectVRoom.css"/> 
            <h1>Click in a Video Room</h1>
            
            <div id="RoomsDiv" />

            <Link to="/">GO BACK</Link>
        </div>
    )
}

export default SelectVRoom;