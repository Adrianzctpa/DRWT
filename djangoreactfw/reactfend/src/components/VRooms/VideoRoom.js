import React, {useContext, useEffect, useState} from "react";
import {useNavigate, Link} from 'react-router-dom'
import GeneralContext from "../../context/GeneralContext"
import Player from '../utils/Player.js'
import styles from "../../../static/css/VideoRoom.module.css"

const VideoRoom = () => {

    const context = useContext(GeneralContext)
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const navigate = useNavigate()

    const handleDelete = async () => {
        let response = await fetch(`/v1/vroomset/${info.uuid}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.tokens.access}`
            }
        })
        let data = await response

        if (response.status === 204) {
            navigate('/selectvroom/')
            window.location.reload(false)
        }
    }

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
                "Authorization": `Bearer ${context.tokens.access}`
            },
            body: formData
        })
        let data = await response.json()

        if (response.status === 200) {
            window.location.reload(false)
        } else {
            alert(data)
        }
    }

    const RoomCheck = async () => {
        const uuid = window.location.pathname.slice(10, 48)

        let response = await fetch('/v1/getvrooms' + uuid, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${context.tokens.access}`
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setInfo(data)
            setLoading(false)
        } 
    }

    useEffect(() => {
        RoomCheck()
    }, [])

    return (
        <>
            { loading ? <h1>404 - Room not found</h1> : (
                <div> 
                    <p>Title: {info.title}</p>
                    <h1>Owner: {info.owner}</h1>
                    <h1>Guest Pause: {info.guest_pause_permission.toString()}</h1>
                    <Player ac={context.tokens.access} pause_perm={info.guest_pause_permission} owner={info.owner} uuid={info.uuid} url={info.videopath}/>

                    <button id="editbtn" onClick={handleEdit}>Edit</button>

                    { info.owner === context.username ? 
                        <button id="delbtn" onClick={handleDelete}>Delete</button> : (
                            null
                        )
                    }

                    <Link to='/selectvroom/'>Select other Vroom</Link>
                    
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
                </div>
            )}
        </>
    )
}

export default VideoRoom;