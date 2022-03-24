import React from "react";
import { Link } from "react-router-dom"

const VideoPlayer = ({ac, vrooms}) => {

    return (
        <>
            <h1>VideoPlayer!</h1>
            <button onClick={() => {console.log(vrooms)}}>CLICK ME TO SEE VROOMS</button>
            <Link to="/">GO BACK</Link>
        </>
    )
}

export default VideoPlayer;