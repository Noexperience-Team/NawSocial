import React from 'react';
import './SidebarRow.css';
import { Avatar } from '@material-ui/core';

function SidebarRow(props) {
    return (

        <div className='sidebarRow'>
            
            {/* Added a className so i can add a border to each avatar depending if he's online or not,
            the src attribute is for the picture,
            the style attribute is a prop, 
            coz each avatar have a situation, either he's online or offline*/}
            
            <Avatar className='avatar' src={props.src} style={{borderColor: props.avatar__color}}/>
            <p>{props.mesg} {props.emoji}</p>
        </div>

    )
}

export default SidebarRow
