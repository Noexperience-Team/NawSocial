import React, { forwardRef } from 'react';
import './MessagesRow.css';
import {Card, CardContent, Typography} from '@material-ui/core';

 const MessagesRow = forwardRef (({mesg, user}, ref) => {

    const isUser = user === mesg.username;
   
    return (
        
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                    variant='h6'
                    component='p'>
                        
                        {!isUser && `${mesg.username || 'me yitsimech'}:`} {mesg.message}

                    </Typography>
                    
                </CardContent>
            </Card>

        </div>
    )
    
})

export default MessagesRow
