import React, {useContext} from 'react';
import GeneralContext from '../../context/GeneralContext'
import styles from "../../../static/css/VideoRoom.module.css"
import BGStyles from '../../../static/css/Backgrounds.module.css'

const Chat = ({socket}) => {

    const {username} = useContext(GeneralContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const message = e.target.message.value 
        
        if (message === '') return

        socket.send(JSON.stringify({
            'message': message,
            'from': username,
            'type': 'chat_message'
        }))
        form.reset()
    }

    return (
        <div className={`${BGStyles.bg_color_lightblack} ${styles.container}`}>
            <div id='chat-container' className={`${BGStyles.bg_color_white} ${styles.chat}`}>    
                <div id='chat' />
            </div>
            <form className={styles.flexer} onSubmit={handleSubmit} id="form" >
                <input className={styles.input} type="text" name="message"></input>
                <button className={`btn btn-primary ${styles.button}`} type="submit">SEND</button>
            </form>
        </div>    
    )
}

export default Chat;