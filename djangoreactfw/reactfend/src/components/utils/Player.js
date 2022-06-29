import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import ReactPlayer from 'react-player';
import GeneralContext from '../../context/GeneralContext';
import Chat from './Chat'
import styles from '../../../static/css/VideoRoom.module.css'

const Player = ({url, uuid, owner, pause_perm, setUsers}) => {
    
    const {username, tokens} = useContext(GeneralContext)
    const [WSocket, setWSocket] = useState('')
    const [mediainfo, setMediaInfo] = useState('')
    const [socketloading, setSocketLoading] = useState(true)

    let player, socket;

    const manageChat = (txt) => {
        let chat = document.getElementById('chat')
        let chatCon = document.getElementById('chat-container')
        let hr = document.createElement('hr')
        let p = document.createElement('p')

        p.textContent = txt

        chat.appendChild(p)
        chat.appendChild(hr)
        chatCon.scrollTop = chatCon.scrollHeight
    }

    const SyncVideo = (progress, socket) => {
        const seconds = progress.playedSeconds
        
        if (Math.round(seconds) !== 0) {
            socket.send(JSON.stringify({
                'time': seconds,
                'type': 'time_sync'
            }))
        }    
    } 

    const VideoState = (socket, state) => {
        socket.send(JSON.stringify({
            'state': state,
            'type': 'video_state'
        }))
    }

    const LoadMedia = () => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const filetype = blob.type.split('/')[0]
            const URLFile = URL.createObjectURL(blob)
            setMediaInfo({type: filetype, blob: URLFile})

            const SocketUrl = `ws://${window.location.host}/ws/video/${uuid}`
            socket = new WebSocket(SocketUrl)
            
            if (filetype === 'video') {          
                player = <ReactPlayer controls={true} id='video'
                className={styles.video}
                height='auto'
                width='100%'
                url={URLFile} muted={true}
                onProgress={owner === username ? (progress) => SyncVideo(progress, VideoSocket) : (
                    undefined
                )}
                onPause={owner === username || pause_perm ? () => VideoState(VideoSocket, true) : (
                    undefined
                )}
                onPlay={owner === username || pause_perm ? () => VideoState(VideoSocket, false) : (
                    undefined
                )}
                />
            } 
            VideoSignal(socket)
        })
    }

    const VideoSignal = (socket) => {
        setWSocket(socket)

        socket.onopen = () => {
            socket.send(JSON.stringify({
                'token': tokens.access,
                'from': username,
                'type': 'user_join'
            }))
        }

        socket.onclose = () => {
            setUsers('')
        }

        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            const video = document.getElementsByTagName('video')[0] === undefined ? null : document.getElementsByTagName('video')[0]

            if (data.type === 'chat') {
                manageChat(`${data.from}: ${data.message}`)
            }

            if (data.type === 'join') {
                manageChat(`${data.from} acabou de entrar!`)

                let userArr = [];

                for (var i = 0; i < data.users.length; i++) {
                    if (data.users[i].uuid === uuid) {
                        userArr.push(<h1 key={data.users[i].username}>{data.users[i].username}</h1>)
                    }
                }

                setUsers(userArr)
            }

            if (data.type === 'disconnect') {
                manageChat(`${data.from} saiu do grupo!`)
                
                let userArr = [];

                for (var i = 0; i < data.users.length; i++) {
                    if (data.users[i].uuid === uuid) {
                        userArr.push(<h1 key={data.users[i].username}>{data.users[i].username}</h1>)
                    }
                }

                setUsers(userArr)
            }

            if (data.type === 'state') {
                if (data.state) {
                    video.pause()
                } else {
                    video.play()
                }   
            }

            if (username === owner) return           
            
            if (data.type === 'sync') {

                if (video.paused) return

                const current = Math.round(video.currentTime)

                if (Math.round(data.time) !== current) {
                    video.currentTime = data.time
                }
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

    useLayoutEffect(() => {
        return () => {
            socket.close()
        }
    }, [])

    return (

        <div className={styles.center} id="mediawrapper">
            { socketloading ? <p>Loading your media</p> : (
                <>
                    {mediainfo.type === 'image' ? 
                        <img src={mediainfo.blob} className={styles.image} /> 
                        : (
                        <div className={styles.videowrapper}>
                            {player}
                        </div>
                    )}
                    <Chat username={username} socket={WSocket}/>
                </>)
            }    
        </div>
    )
}

export default Player;