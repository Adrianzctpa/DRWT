import React from "react";

const VideoRoom = ({info}) => {

    return (
        <>
            {
                info === undefined ? 
                <h1>PROHIBITED ACCESS</h1> : (
                <div> 
                    <p>{info.title}</p>
                    <h1>{info.owner}</h1>
                    <h1>{info.guest_pause_permission.toString()}</h1>
                    <h1>{info.videopath}</h1>

                    <button>Edit</button>

                    <form>
                        <label>Title:</label>
                        <input type="text" name="title" />

                        <label>Can guest pause video?</label>
                        <input type="checkbox" name="pause_perm" />

                        <label>Select a video to share:</label>
                        <input onChange={(e) => console.log(e)} id="file" 
                        type="file" name="vpath" accept="image/png, image/jpeg, 
                        image/jpg, image/webp, video/mp4, video/x-m4v" />

                        <button type="submit">Create</button>
                    </form>
                </div>)  
            }
        </>
    )
}

export default VideoRoom;