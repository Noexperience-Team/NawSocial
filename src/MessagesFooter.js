import React from 'react';
import './style/MessagesFooter.css';
import PublishIcon from '@material-ui/icons/Publish';
import PhotoIcon from '@material-ui/icons/PhotoLibrary';
import GifIcon from '@material-ui/icons/Gif';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ThumbIcon from '@material-ui/icons/ThumbUp';


function MessagesFooter(props) {

    return (

        <div className='messages__footer'>

                <IconButton>
                    <PublishIcon className='icon'/>
                </IconButton>

                <IconButton className='icon'>
                    <PhotoIcon/>
                </IconButton>

                <IconButton className='icon'>
                    <GifIcon/>
                </IconButton>

                <form>
                    <input value={props.input} onChange={props.onChange}/>

                    <IconButton className='icon' disabled={!props.input} type='submit' onClick={props.sendMessage}>
                        <SendIcon/>
                    </IconButton>
                </form>


                <IconButton className='icon' onClick={props.sendEmoji}>
                    <ThumbIcon/>
                </IconButton>

            </div>
    )
}

export default MessagesFooter 