import React from 'react';

const Chat = ({username, ac, socket}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const message = e.target.message.value 
        socket.send(JSON.stringify({
            'message': message,
            'from': username,
            'token': ac,
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