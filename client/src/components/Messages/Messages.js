import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Messages.css'
import Message from '../Message/Message'

const Messages = (props) => {
    return(
    <ScrollToBottom className = 'messages'>
        {props.messages.map((msg, i) => <div key = {i}> <Message message = {msg} name = {props.name}/> </div>)}
    </ScrollToBottom>
    );
}

export default Messages;