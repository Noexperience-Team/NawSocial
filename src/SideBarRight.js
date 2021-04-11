import React from 'react';
import './style/SideBarRight.css';
import {Avatar, IconButton} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';

function SideBarRight(props) {
    return (
        <div className='sidebarRight'>

            <IconButton>
                <Avatar className='avatar' src={props.src} style={{borderColor: props.avatar__color}}/>

            </IconButton>

            <IconButton className='icon__right'>
                <CallIcon/>
            </IconButton>

            <IconButton className='icon__right'>
                <VideocamIcon/>
            </IconButton>
        </div>
    )
}

export default SideBarRight