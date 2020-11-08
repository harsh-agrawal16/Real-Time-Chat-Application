import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'

let socket;

const Chat = ({ location }) => {

    const END_POINT = 'localhost:5000'
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    //this is similar to componentwillmount and componentdidupdate
    //this happens when the component renders
    useEffect(() => {
        //destructuring
        const {name , room} = queryString.parse(location.search); //makes a javascript object of the attributes in the url.

        socket = io(END_POINT);
        //emitting events
        socket.emit('join', {name : name, room : room}, (error)=>{
            console.log(error);
            alert(error);
        });

        socket.on('message', (data, callback) => {
            console.log('Message: ', data.text);
        });
        
        setName(name);
        setRoom(room);

        // return () => {
        //     //socket.emit('disconnect');

        //     socket.off();
        // }
    }, [END_POINT, location.search]);

    //this useEffect handles the messages.
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    //define a function for sending messages.
    const sendMessage = (event) => {
        event.preventDefault(); //to avoid sending message everytime the page is refreshed.

        if(message) {
            console.log(message);
            socket.emit('sendMessage', message , () => {
                setMessage('');
            });
        }
    };

    return (
        <div className = 'outerContainer'>
            <div className = 'container'>
                <input value = {message}
                    onChange = {(event) => setMessage(event.target.value)}
                    onKeyPress = {(event) => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    )
}


export default Chat;