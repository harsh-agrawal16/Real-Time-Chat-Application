import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Message.css'

//props = {message : {user, text}, name }
const Message = (props) => {
    const sender = props.name.trim().toLowerCase();
    let isSentByUser = false;
    if(props.message.user === sender) isSentByUser = true;

    return(
        (isSentByUser) ? 
            <div className = 'messageContainer justifyEnd'> 
                <p className = 'sentText'>{props.message.user}</p>
                <div className = 'messageBox justifyEnd backgroundBlue'>
                    <p className = 'messageText'>{props.message.text}</p>
                </div>
            </div>
        :
            <div className = 'messageContainer justifyStart'> 
                <p className = 'sentText'>{props.message.user}</p>
                <div  className = 'messageBox justifyStart backgroundLight colorDark'>
                    <p className = 'messageText'>{props.message.text}</p>
                </div>
            </div>
    );
}

export default Message;