import React, {useEffect} from 'react';

const Chat = ({uuid, username, ac}) => {

    useEffect(() => {
        if (uuid !== undefined) {    
            let url = `ws://${window.location.host}/ws/video/${uuid}`
            const ChatSocket = new WebSocket(url)
            const btn = document.createElement('button')
            btn.onclick = () => {
                ChatSocket.close()
            }
            btn.textContent = 'leave'

            ChatSocket.onopen = () => {
                console.log('connected')
                document.getElementById('form').appendChild(btn)
            }

            ChatSocket.onclose = () => {
                console.log('disconnected')
            }

            ChatSocket.onmessage = (e) => {
                let data = JSON.parse(e.data)

                if (data.type === 'chat') {
                    let chat = document.getElementById('chat')
                    let p = document.createElement('p')
                    p.textContent = `${data.from}: ${data.message}`
                    chat.appendChild(p)
                }
            }

            let form = document.getElementById('form')
            form.addEventListener('submit', (e)=> {
                e.preventDefault()
                let message = e.target.message.value 
                ChatSocket.send(JSON.stringify({
                    'message': message,
                    'from': username,
                    'token': ac,
                    'type': 'chat_message'
                }))
                form.reset()
            })
        }    
    }, [])

    return (
        <>    
            <div id='chat' />
            
            <form id="form" >
                <input type="text" name="message"></input>
                <button type="submit">SEND</button>
            </form>
        </>    
    )
}

export default Chat;