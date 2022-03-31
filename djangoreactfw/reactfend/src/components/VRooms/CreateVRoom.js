import React from "react";
import "./SelectVRoom.css";

const CreateVRoom = () => {

    return (
        <>
            <form>
                <label>Title</label>
                <input type="text" name="title" />

                <label>Can guest pause video?</label>
                <input type="checkbox" name="pause_perm" />

                <label>Select a video to share!</label>
                <input type="file" name="vpath" />

                <label>You can also paste a youtube link or path to a file</label>
                <input type="text" name="link" />
            </form>
        </>
    )
}

export default CreateVRoom;