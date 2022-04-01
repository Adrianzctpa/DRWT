import React from "react";
import "../../../static/css/CreateVRoom.css"

const CreateVRoom = () => {

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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.vpath.files)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" />

                <label>Can guest pause video?</label>
                <input type="checkbox" name="pause_perm" />

                <label>Select a video to share:</label>
                <input onChange={VerifyFile} id="file" type="file" name="vpath" accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/x-m4v" />

                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default CreateVRoom;