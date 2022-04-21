import React, {useEffect} from 'react';

const Chat = ({uuid, owner, ac}) => {

    useEffect(() => {
        let url = `ws://${window.location.host}/ws/video/${uuid}`

        const ChatSocket = new WebSocket(url)

        ChatSocket.onopen = () => {
            console.log('conected')
        }

        ChatSocket.ondisconnect = () => {
            console.log('disconected')
        }

        ChatSocket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)

            if (data.type === 'chat') {
                let chat = document.getElementById('chat')
                let p = document.createElement('p')
                p.textContent = data.message
                chat.appendChild(p)
            }
        }

        let form = document.getElementById('form')
        form.addEventListener('submit', (e)=> {
            e.preventDefault()
            let message = e.target.message.value 
            ChatSocket.send(JSON.stringify({
                'message': message,
                'from': owner,
                'token': ac,
                'type': 'chat_message'
            }))
            form.reset()
        })

    })

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