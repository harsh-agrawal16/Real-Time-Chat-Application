import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Header from '../Header/Header';
import Input from '../Input/Input';

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

        setName(name);
        setRoom(room);

        socket = io(END_POINT);
        //emitting events
        socket.emit('join', {name : name, room : room}, (error)=>{
            console.log(error);
            alert(error);
        });

        socket.on('message', (data, callback) => {
            console.log('Message: ', data.text);
        });
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

    console.log(message, messages);

    return (
        <div className = 'outerContainer'>
            <div className = 'container'>
                <Header room = {room}/>
                <Input sendMessage = {sendMessage} setMessage = {setMessage} message = {message}/>
            </div>
        </div>
    )
}


export default Chat;