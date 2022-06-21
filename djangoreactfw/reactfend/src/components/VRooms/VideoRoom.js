import React, {useContext, useEffect, useState} from "react";
import {useNavigate, Link, useParams} from 'react-router-dom'
import GeneralContext from "../../context/GeneralContext"
import Player from '../utils/Player.js'
import styles from "../../../static/css/VideoRoom.module.css"
import BGStyles from '../../../static/css/Backgrounds.module.css'

const VideoRoom = () => {

    const context = useContext(GeneralContext)
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const navigate = useNavigate()
    const { uuid } = useParams() 

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this videoroom?")) return

        let response = await fetch(`/v1/vroomset/${uuid}/`, {
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

    const RoomCheck = async () => {
        let response = await fetch(`/v1/getvrooms/${uuid}/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${context.tokens.access}`
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            console.log(uuid)
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
                <div className={`${BGStyles.bg_color_strongred} ${styles.flex}`}> 
                    <div className={`${BGStyles.bg_color_lightblack} ${styles.center_stack}`}>
                        <h1>{info.title}</h1>
                        <h1>Owner: {info.owner}</h1>
                        <h1>Guest Pause: {info.guest_pause_permission.toString()}</h1>
                    </div>

                    <Player pause_perm={info.guest_pause_permission} owner={info.owner} uuid={info.uuid} url={info.videopath}/>

                    { info.owner === context.username ? 
                        <>
                            <Link to={`/createvroom/${uuid}/`}>
                                <button className={`${styles.btn} btn btn-primary`}>
                                    Edit
                                </button>
                            </Link>
                            <button className={`${styles.btn} btn btn-danger`} id="delbtn" onClick={handleDelete}>Delete</button> 
                        </>
                        : (
                            null
                        )
                    }

                    <Link to='/selectvroom/'><button className={`${styles.btn} btn btn-secondary`}>Select other vroom</button></Link>
                 </div>
            )}
        </>
    )
}

export default VideoRoom;