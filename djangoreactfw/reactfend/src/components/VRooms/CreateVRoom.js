import React from "react";
import "../../../static/css/CreateVRoom.css"

const CreateVRoom = ({ac}) => {

    const VerifyFile = (e) => {
        const SupportedFiles = ["image/jpg", "image/png", 
        "image/jpeg", "image/webp", "video/mp4", "video/x-m4v"]
    
        const filetype = e.target.files[0].type
        let includes = false
        console.log(filetype)

        if (SupportedFiles.includes(filetype)) {
            includes = true;
        }

        return includes;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("guest_pause_permission", e.target.pause_perm.checked)
        formData.append("videopath", e.target.vpath.files[0])

        let response = await fetch("/v1/vroomset/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ac}`
            },
            body: formData
        })
        let data = await response.json()
        
        if (response.status === 201) {
            console.log(JSON.stringify(data, e))
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" />

                <label>Can guest pause video?</label>
                <input type="checkbox" name="pause_perm" />

                <label>Select a video to share:</label>
                <input onChange={(e) => console.log(e)} id="file" type="file" name="vpath" accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/x-m4v" />

                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default CreateVRoom;