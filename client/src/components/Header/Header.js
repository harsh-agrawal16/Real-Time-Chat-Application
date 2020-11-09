import React from 'react'
import online from '../../icons/online.jpeg'
import './Header.css'

const Header = (props) => {
     return (
         <div className = 'header'>
             <div className = 'leftInnerContainer'>
                 <img className = 'onlineIcon' src = {online} alt = 'online icon'/>
                <h3>{props.title}</h3>
             </div>
             <div className = 'rightInnerContainer'>
                 <a href = '/'>Close</a>
             </div>
         </div>
     )
}

export default Header;