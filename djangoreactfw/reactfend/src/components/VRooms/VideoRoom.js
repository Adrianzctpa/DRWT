import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext"
import Chat from "./Chat.js"
import Player from './Player.js'
import styles from "../../../static/css/VideoRoom.module.css"

const VideoRoom = ({info, ac}) => {

    const context = useContext(AuthContext)

    const handleEdit = () => {
        let form  = document.getElementById('editform')
        let btn = document.getElementById('editbtn')
        
        if (form.style.display === '') {
            form.style.display = 'flex'
            btn.textContent = 'Close'
        } else {
            form.style.display = ''
            btn.textContent = 'Edit'
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
                <div id="divvy"> 
                    <p>Title: {info.title}</p>
                    <h1>Owner: {info.owner}</h1>
                    <h1>Guest Pause: {info.guest_pause_permission.toString()}</h1>
                    <Chat username={context.username} ac={ac} uuid={info.uuid}/>
                    <Player url={info.videopath}/>

                    <button id="editbtn" onClick={handleEdit}>Edit</button>

                    <form id="editform" onSubmit={handleSubmit} className={styles.form}> 
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