import React from 'react'
import SingleUser from './SingleUser'
import './UsersContainer.css'
import ScrollToBottom from 'react-scroll-to-bottom'


const UsersContainer = (props) => {
    return(
        <ScrollToBottom className = 'usersContainer'>
            <div>
                {props.users.map((user) => <SingleUser name = {user.name}/>)}
            </div>
        </ScrollToBottom>
    );
};


export default UsersContainer;
