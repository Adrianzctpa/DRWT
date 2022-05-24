import React, {useContext} from 'react';
import GeneralContext from '../../context/GeneralContext'

const Chat = ({socket}) => {

    const {username} = useContext(GeneralContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const message = e.target.message.value 
        socket.send(JSON.stringify({
            'message': message,
            'from': username,
            'type': 'chat_message'
        }))
        form.reset()
    }

    return (
        <>    
            <div id='chat' />

            <form onSubmit={handleSubmit} id="form" >
                <input type="text" name="message"></input>
                <button type="submit">SEND</button>
                <button onClick={() => socket.close()}>Leave</button>
            </form>
        </>    
    )
}

export default Chat;