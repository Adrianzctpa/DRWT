import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

var arr = [];
const SelectVRoom = ({ac, vrooms}) => {
    
    const GenerateVrooms = () => {
        let RoomsDiv = document.getElementById("RoomsDiv")
        
        vrooms.forEach((e,k,a) => {
            let div = document.createElement("div")
            div.classList.add("Room")
            div.onclick = () => {
                console.log(`you clicked vroom number ${k + 1} `)
            }
            
            let title = document.createElement("p")
            title.textContent = e.vroom.title

            let guestpause = document.createElement("h5")
            guestpause.textContent = "Guest Pause: " + e.vroom.guest_pause_permission

            let vpath = document.createElement("h5")
            vpath.textContent = "Video Path: " + e.vroom.videopath

            div.appendChild(title)
            div.appendChild(guestpause)
            div.appendChild(vpath)
            RoomsDiv.appendChild(div)
        })
    }

    const GenerateRoutes = () => {
        vrooms.forEach((e,k,a) => {
            let routes = []
            //routes.push()
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

export const routes = arr;