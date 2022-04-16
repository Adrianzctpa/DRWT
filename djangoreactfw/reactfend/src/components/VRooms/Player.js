import React, {useEffect} from 'react';

const Player = ({url}) => {
    
    const LoadMedia = () => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const filetype = blob.type.split('/')[0]
            const URLFile = URL.createObjectURL(blob)
            const div = document.getElementById("mediawrapper")

            if (filetype === 'image') {
                const img = new Image()
                
                img.height = 300;
                img.width = 500;
                img.src = URLFile
                
                div.appendChild(img)
            } else {
                const video = document.createElement("video")
                video.setAttribute("src", URLFile)
                div.appendChild(video)

                const controls = document.createElement('div')
                const btn = document.createElement('button')

                controls.classList.add('controls')
                btn.textContent = 'Play'
                btn.onclick = () => {
                    console.log('clicked')
                    if (!video.paused) {
                        video.pause()
                    } else {
                        video.play()
                    }
                }

                controls.appendChild(btn)
                div.appendChild(controls)
            }

        })
    }

    useEffect(() => {
        LoadMedia()
    })

    return (
        <div id="mediawrapper" />
    )
}

export default Player;