import React from 'react';
import './Header.css';
import logo from './icons/logo.png';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import StoreIcon from '@material-ui/icons/Store';
import {Avatar, IconButton} from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

function Header() {
    
    return (
        <div className='header'>
        <div className='header__left'>
        <img src={logo} alt='Logo'/>

        <div className='search__bar'>
            <SearchIcon />
            <input placeholder='a3mil recherche' type='text'/>
        </div>

        </div>

        <div className='header__middle'>
            <div className='header__option 
            header__option--active'>
                <HomeIcon/>
            </div>

            <div className='header__option'>
                <VideoIcon/>
            </div>

            <div className='header__option'>
                <StoreIcon/>
            </div>

        </div>

        <div className='header__right'>

            <div className='header__info'>
                <Avatar/>
                <h4>Mohamed Amine</h4>
            </div>

            <IconButton>
                <MessageIcon/>
            </IconButton>

            <IconButton>
                <NotificationsIcon/>
            </IconButton>

            <IconButton>
                <SettingsIcon/>
            </IconButton>
        </div>
        </div>
    )
};

export default Header;