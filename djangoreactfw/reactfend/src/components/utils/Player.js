import React, {useEffect, useState} from 'react';

const Player = ({url, uuid}) => {
    
    const [mediainfo, setMediaInfo] = useState('')
    const [loading, setLoading] = useState(true)

    const LoadMedia = () => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const filetype = blob.type.split('/')[0]
            const URLFile = URL.createObjectURL(blob)
            setMediaInfo({type: filetype, blob: URLFile})
            setLoading(false)
        })
    }

    const handleClick = (e) => {
        const video = document.getElementById('video')
       
        if (!video.paused) {
            video.pause()
            e.target.textContent = 'Play'
        } else {
            video.play()
            e.target.textContent = 'Pause'
        }
    }

    const VideoSignal = () => {
        let url = `ws://${window.location.host}/ws/video/${uuid}`

        const ChatSocket = new WebSocket(url)

        ChatSocket.onopen = () => {
            console.log('connected')
        }

        ChatSocket.onclose = () => {
            console.log('disconnected')
        }

        ChatSocket.onmessage = (e) => {
            let data = JSON.parse(e.data)

            console.log(data)
        }        
    }

    useEffect(() => {
        if (url !== undefined) {
            LoadMedia()
            VideoSignal()
        }    
    }, [url])

    return (
        <div id="mediawrapper">
            { loading ? <p>Loading your media</p> : (
                <>
                    {mediainfo.type === 'image' ? 
                        <img src={mediainfo.blob} width='500' height='300' /> : (
                        <>
                            <video id='video' src={mediainfo.blob} />
                            
                            <div id="controls">
                                <button onClick={handleClick}>Play</button>
                            </div>
                        </>
                    )}
                </>)
            }    
        </div>
    )
}

export default Player;