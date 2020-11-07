import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;


const Chat = ({ location }) => {

    const END_POINT = 'localhost:5000'
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    //this is similar to componentwillmount and componentdidupdate
    //this happens when the component renders
    useEffect(() => {
        //destructuring
        const {name , room} = queryString.parse(location.search); //makes a javascript object of the attributes in the url.

        socket = io(END_POINT);
        //emitting events
        socket.emit('join', {name : name, room : room}, (error)=>{
            console.log(error);
            //alert(error);
        });
        
        setName(name);
        setRoom(room);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }



    }, [END_POINT, location.search]);


    return (
        <div>
            <h1>hello</h1>
        </div>
    )
}


export default Chat;