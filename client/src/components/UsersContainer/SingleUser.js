import React from 'react'
import online from '../../icons/online.jpeg'
import './UsersContainer.css'

const SingleUser = (props) => {
    return(
        <div className = 'singleUser'>
            <p className = 'userName'>{props.name}</p>
        </div>
    );
};


export default SingleUser;
