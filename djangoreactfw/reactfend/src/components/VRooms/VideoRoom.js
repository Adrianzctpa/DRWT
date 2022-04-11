import React from "react";
import Player from './Player.js'
import styles from "../../../static/css/VideoRoom.module.css"

const VideoRoom = ({info, ac}) => {

    const handleEdit = () => {
        if (document.querySelector('form').style.display === '') {
            document.querySelector('form').style.display = 'flex'
            document.querySelector("button").textContent = 'Close'
        } else {
            document.querySelector('form').style.display = ''
            document.querySelector("button").textContent = 'Edit'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("guest_pause_permission", e.target.pause_perm.checked)
        if (e.target.vpath.files[0] !== undefined) {   
            formData.append("videopath", e.target.vpath.files[0])
        }

        let response = await fetch(`/v1/vroomset/${info.uuid}/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${ac}`
            },
            body: formData
        })
        let data = await response.json()

        if (response.status === 200) {
            console.log("Edited!")
            window.location.reload(false)
        } else {
            alert(data)
        }
    }

    return (
        <>
            {
                info === undefined ? 
                <h1>PROHIBITED ACCESS</h1> : (
                <div> 
                    <p>Title: {info.title}</p>
                    <h1>Owner: {info.owner}</h1>
                    <h1>Guest Pause: {info.guest_pause_permission.toString()}</h1>
                    <Player url={info.videopath}/>

                    <button onClick={handleEdit}>Edit</button>

                    <form onSubmit={handleSubmit} className={styles.form}> 
                        <label>Title:</label>
                        <input type="text" name="title" />

                        <label>Can guest pause video?</label>
                        <input type="checkbox" name="pause_perm" />

                        <label>Select a video to share:</label>
                        <input id="file"  type="file" name="vpath" 
                        accept="image/png, image/jpeg, image/jpg,
                        image/webp, video/mp4, video/x-m4v" />

                        <button type="submit">Edit</button>
                    </form>
                </div>)  
            }
        </>
    )
}

export default VideoRoom;