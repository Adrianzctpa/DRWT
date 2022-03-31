import React from "react";

const VideoRoom = ({info}) => {

    return (
        <>
            {
                info === undefined ? 
                <h1>404 - UUID does not exist</h1> : (
                <div> 
                    <p>{info.title}</p>
                    <h1>{info.owner}</h1>
                    <h1>{info.guest_pause_permission.toString()}</h1>
                    <h1>{info.videopath}</h1>
                </div>)  
            }
        </>
    )
}

export default VideoRoom;