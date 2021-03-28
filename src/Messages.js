import React, {useState, useEffect} from 'react';
import FlipMove from 'react-flip-move';
import db from './firebase';
import firebase from 'firebase';
import './Messages.css';
import MessagesFooter from './MessagesFooter';
import MessagesRow from './MessagesRow';

function Messages(props) {

    const [input, setInput] = useState('');
    
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    
    useEffect (()=> {
        db.collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(
                doc => (
                    {   id: doc.id,
                        message: doc.data() }
                            )
                        )
                    );
        });
    }, []);

    useEffect(() => {
        setUsername(prompt('Chnowa ismik ?'));
    }, []);

    const sendMessage = event => { 
        event.preventDefault(); // khater kif 3mlat form, par défaut page trefrechi ro7ha, donc messaget yetfaskhou..
        // function that will allow us to send a message
        
        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        //setMessages([...messages, {username: username, message: input}]); // ... hiye append
        setInput('');
    };

    const sendEmoji = event => {

        db.collection('messages').add({
            message: '👍',
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        //setMessages([...messages, {username: username, message:'👍'}]); // ... hiye append
    };

    const onChange = event => {
        setInput(event.target.value);
    };
    return (
        
        <div className='messages' style={{borderColor: props.box__color}}>
            
            <div className='message__body'>

                <FlipMove>
                   
                    {
                        messages.map(({id, message}) => {
                        
                            return <MessagesRow key={id} user={username} mesg={message}/>

                            })
                    }
            
                </FlipMove>
                
            </div>
            
            <div className='message__footer_'>

                <MessagesFooter input={input} 
                            onChange={onChange} sendMessage={sendMessage} sendEmoji={sendEmoji}/>
            
            </div>
            

        </div>
    )
    
}

export default Messages