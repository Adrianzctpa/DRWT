import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext"
import styles from "../../../static/css/SelectVRoom.module.css"
import { Link, useNavigate } from "react-router-dom"

const SelectVRoom = () => {

    const {vrooms, uvrooms} = useContext(AuthContext)
    const navigate = useNavigate()

    const GenerateVrooms = (arr) => {
        let RoomsDiv = document.getElementById("RoomsDiv")
        
        arr.forEach((e,k,a) => {
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

    const handleClick = () => {
        let RoomsDiv = document.getElementById("RoomsDiv")
        let btn = document.getElementById('vroombtn')

        if (btn.textContent === 'All Video Rooms') {
            btn.textContent = 'Your Video Rooms'
            RoomsDiv.replaceChildren();
            GenerateVrooms(vrooms)
        } else {
            btn.textContent = 'All Video Rooms'
            RoomsDiv.replaceChildren();
            GenerateVrooms(uvrooms)
        }    
    }

    const searchQuery = (e) => {
        const input = document.getElementById('inputquery')
        const query = input.value.toUpperCase()
        const RoomsDiv = document.getElementById("RoomsDiv")
        
        for (var i = 0; i < RoomsDiv.children.length; i++) {
            let p = RoomsDiv.children[i].getElementsByTagName("p")[0];
            let pcontent = p.textContent || p.innerText

            if (pcontent.toUpperCase().indexOf(query) > -1) {
                RoomsDiv.children[i].style.display = "";
            } else {
                RoomsDiv.children[i].style.display = "none"
            }
        }
    }

    useEffect(() => {
        GenerateVrooms(uvrooms)
    })

    return (
        <div>
            <h1>Click in a Video Room</h1>
            
            <button id="vroombtn" onClick={handleClick}>All Video Rooms</button>
            <input onChange={searchQuery} type="text" id="inputquery" placeholder="Search..."/>
            <div id="RoomsDiv" className={styles.RoomsDiv} />
            <button>Create</button>

            <Link to="/">GO BACK</Link>
        </div>
    )
}

export default SelectVRoom;