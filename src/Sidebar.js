import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import Melek from './icons/melek.png';
import Ichrak from './icons/ichrak.jpg';
import Becem from './icons/becem.png';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CreateIcon from '@material-ui/icons/Create';
import {IconButton} from '@material-ui/core';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
               <div>
                    <IconButton className='icon'>
                        <VideoCallIcon/>
                    </IconButton>
                    
                    <IconButton className='icon'>
                        <CreateIcon/>
                    </IconButton>
               </div>
               
                <h3>Misageeet</h3>
                
            </div>

            <SidebarRow src={Melek} mesg='Me: Hatta eni mich jey' emoji='🙈' avatar__color='green'/>
            <SidebarRow src={Becem} mesg='Bacem: Ah ch3malt ?' avatar__color='gray'/>
            <SidebarRow src={Ichrak} mesg='Me: Behi mitfehmin' avatar__color='gray'/>
                
        </div>
    )
}

export default Sidebar