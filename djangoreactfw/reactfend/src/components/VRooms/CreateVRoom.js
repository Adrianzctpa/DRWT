import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import GeneralContext from "../../context/GeneralContext"
import styles from "../../../static/css/CreateVRoom.module.css"

const CreateVRoom = () => {

    const {tokens} = useContext(GeneralContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("guest_pause_permission", e.target.pause_perm.checked)
        formData.append("videopath", e.target.vpath.files[0])

        let response = await fetch("/v1/vroomset/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${tokens.access}`
            },
            body: formData
        })
        let data = await response.json()
        
        if (response.status === 200) {
            navigate(`/videoroom/${data.resp.uuid}/`)
            window.location.reload(false)
        }
        
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" />

                <label>Can guest pause video?</label>
                <input type="checkbox" name="pause_perm" />

                <label>Select a video to share:</label>
                <input id="file" type="file" name="vpath" accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/x-m4v" />

                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default CreateVRoom;