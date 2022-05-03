import React, {useEffect, useState, useContext, useRef} from 'react';
import ReactPlayer from 'react-player';
import GeneralContext from '../../context/GeneralContext';
import Chat from './Chat'

var player;
const Player = ({url, uuid, owner}) => {
    
    const {username, tokens} = useContext(GeneralContext)
    const [WSocket, setWSocket] = useState('')
    const [mediainfo, setMediaInfo] = useState('')
    const [socketloading, setSocketLoading] = useState(true)

    const SyncVideo = (e) => {
        if (owner === username) {
            console.log(e)
        }
    } 

    const LoadMedia = () => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const filetype = blob.type.split('/')[0]
            const URLFile = URL.createObjectURL(blob)
            setMediaInfo({type: filetype, blob: URLFile})
            
            if (filetype === 'video') {
                const SocketUrl = `ws://${window.location.host}/ws/video/${uuid}`
                const VideoSocket = new WebSocket(SocketUrl)
                
                player = <ReactPlayer controls={true} id='video'
                url={URLFile} onProgress={SyncVideo(VideoSocket)}/>

                VideoSignal(VideoSocket)
            }
        })
    }

    const VideoSignal = (WSocket) => {
        setWSocket(WSocket)

        WSocket.onopen = () => {
            console.log('connected (video)')
        }

        WSocket.onclose = () => {
            console.log('disconnected (video)')
        }

        WSocket.onmessage = (e) => {
            let data = JSON.parse(e.data)

            if (data.type === 'chat') {
                let chat = document.getElementById('chat')
                let p = document.createElement('p')
                p.textContent = `${data.from}: ${data.message}`
                chat.appendChild(p)
            }
        } 

        if (socketloading) {
            setSocketLoading(false)
        }
    }

    useEffect(() => {
        if (url !== undefined) {
            LoadMedia()     
        }    
    }, [])

    return (
        <div id="mediawrapper">
            { socketloading ? <p>Loading your media</p> : (
                <>
                    <Chat username={username} ac={tokens.access} socket={WSocket}/>
                    {mediainfo.type === 'image' ? 
                        <img src={mediainfo.blob} width='500' height='300' /> : (
                        <>
                            {player}
                        </>
                    )}
                </>)
            }    
        </div>
    )
}

export default Player;