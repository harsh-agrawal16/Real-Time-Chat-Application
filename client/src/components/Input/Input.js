import React from 'react';

import './Input.css';

const Input = (props) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={props.message}
      onChange={({ target: { value } }) => props.setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}
    />
    <button className="sendButton" onClick={event => props.sendMessage(event)}>Send</button>
  </form>
)

export default Input;